# 3D Filament Profiles Mock

I love the [3D Filament Profiles](https://3dfilamentprofiles.com) site, but it's a bit slow, especially the /filaments page. After looking at the network requests, I noticed that loading the page takes a total of 7 seconds. Since I do know a bit of Next.js and I'm obsessed with performance, I decided to try to improve it. This is a mock of the site with totally random AI generated data.

It features a fuzzy search, pagination, filtering, and sorting. The fake dataset contains 11k rows (similar to the original site). It lives on a free tier Supabase instance, while the site is hosted on Vercel.

## Why is it so fast?

The main reason is caching. I've used the `use cache` directive as well as PPR (both of which are currently in Next.js Canary). This can however also be achieved with the currently stable caching strategies within Next.js.

The key problem is the use of RSC (React Server Components) since the page only renders, once all the data is fetched which can take a while, especially with near 11k rows + joins for things like brands. Therefore, I'm caching the entire table very aggressively on the first render. That way it only takes a few milliseconds to render the page after the first load. When the data changes, we can use the `revalidatePath` function to invalidate the cache and fetch the new data. This is represented by the refresh button in the top right corner.

## Why is this a good approach?

- It significantly improves the user experience since the page now loads basically instantly
- It saves cost for the hosting since the database is now only queried when the data changes and any cloud function also only runs when the cache is missed
- It allows a cheap implementation of an API since this could effectively be a static endpoint that only updates when the data changes ([reference to GitHub comment on cost](https://github.com/MarksMakerSpace/filament-profiles/issues/134#issuecomment-2907630831))

# The Hack to make Supabase behave

Since Supabase is not just a Postgres database, but also handles permissions through RLS, it need the request cookies for any database operation. This means that no page that relies on data from Supabase can be cached. Everything is dynamic, which makes the compute on the vercel side very expensive and also means that the same data is read over and over again. The solution I found to make it work is to have two separate supabase clients on the server: one that gets the request cookies and therefore can be used to access per-user data, and a second one that instead uses an admin API key. This way, I can effectively bypass RLS and don't need to worry about the cookies. The benefit of this is that the page can now be cached and the data is only read once.

> **⚠️ Warning:**  
> Using the admin API key is save and actually the recommended to handle scenarios like this. However, DO NOT, UNDER ANY CIRCUMSTANCES, USE IT FOR NON-PUBLIC DATA. It bypasses RLS, so when you request a user's profile without checking the user ID, you can read any user's data and so can any other user.

To prevent any confusion, I've named them `createSupabaseServerClient` and `createSupabaseServerAdminClient` to make it clear which one is used for which purpose.

```ts
// the usual server-side supabase client that gets the cookies from the request to handle RLS in Supabase
// since it gets the cookies from the request, it can't access the db without forcing the page to be dynamic and therefore it can't be cached by next

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
}

// the admin client that doesn't get the cookies from the request and therefore has full access to the database
// it can access the db without forcing the page to be dynamic and therefore it can be cached by next
// DO NOT USE THIS TO QUERY USER SPECIFIC DATA!!!!

export async function createSupabaseServerAdminClient() {
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
```

## Notes

This is a very basic example of how to improve the performance of a Next.js app that works with this amount of data. Since the key point of this mock is to demonstrate the performance improvement, the entire site is "vibe coded" with cursor, so I would not recommend using this as reference.

# 3D Filament Profiles Mock

I love the [3D Filament Profiles](https://3dfilamentprofiles.com) site, but it's a bit slow, especially the /filaments page. After looking at the network requests, I noticed that loading the page takes a total of 7 seconds. Since I do know a bit of Next.js and I'm obsessed with performance, I decided to try to improve it. This is a mock of the site with totally random AI generated data.

It features a fuzzy search, pagination, filtering, and sorting. The fake dataset contains 11k rows (similar to the original site). It lives on a free tier Postgres database on Neon, while the site is hosted on Vercel.

## Why is it so fast?

The main reason is caching. I've used the `use cache` directive as well as PPR (both of which are currently in Next.js Canary). This can however also be achieved with the currently stable caching strategies within Next.js.

The key problem is the use of RSC (React Server Components) since the page only renders, once all the data is fetched which can take a while, especially with near 11k rows + joins for things like brands. Therefore, I'm caching the entire table very aggressively on the first render. That way it only takes a few milliseconds to render the page after the first load. When the data changes, we can use the `revalidatePath` function to invalidate the cache and fetch the new data. This is represented by the refresh button in the top right corner.

## Why is this a good approach?

- It significantly improves the user experience since the page now loads basically instantly
- It saves cost for the hosting since the database is now only queried when the data changes and any cloud function also only runs when the cache is missed
- It allows a cheap implementation of an API since this could effectively be a static endpoint that only updates when the data changes ([reference to GitHub comment on cost](https://github.com/MarksMakerSpace/filament-profiles/issues/134#issuecomment-2907630831))

## Notes

This is a very basic example of how to improve the performance of a Next.js app that works with this amount of data. Since the key point of this mock is to demonstrate the performance improvement, the entire site is "vibe coded" with cursor, so I would not recommend using this as reference.

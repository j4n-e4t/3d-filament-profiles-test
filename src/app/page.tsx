import { Suspense } from "react";
import { FilamentTable } from "@/components/FilamentTable";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export const experimental_ppr = true;

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="mb-2 text-3xl font-semibold text-gray-900">
          3D Filament Profiles Mock (Next.js + Supabase + Vercel)
        </h1>

        <Button
          onClick={async () => {
            "use server";
            revalidatePath("/");
          }}
        >
          Refresh Data
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FilamentTable />
      </Suspense>
    </main>
  );
}

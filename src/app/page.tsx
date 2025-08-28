import { Suspense } from "react";
import { FilamentTable } from "./_components/filament-table";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export const experimental_ppr = true;

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          3D Filament Profiles Mock
        </h1>
      </div>
      <Button
        onClick={async () => {
          "use server";
          revalidatePath("/");
        }}
      >
        clear cache
      </Button>
      <Suspense fallback={<div>Loading...</div>}>
        <FilamentTable />
      </Suspense>
    </main>
  );
}

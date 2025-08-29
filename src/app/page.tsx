"use cache";
import { Suspense } from "react";
import { FilamentTable, type Filament } from "./_components/filament-table";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { SERVER_getFullFilamentTableData } from "@/utils/supabase/queries";

export default async function HomePage() {
  const { data, total, totalTime } = await SERVER_getFullFilamentTableData();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          3D Filament Profiles Mock
        </h1>

        <Button
          onClick={async () => {
            "use server";
            revalidatePath("/");
          }}
        >
          Refresh
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FilamentTable data={data} />
      </Suspense>
      <p>Total time of last db query: {totalTime.toFixed(2)}ms</p>
    </main>
  );
}

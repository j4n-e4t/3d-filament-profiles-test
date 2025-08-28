import { Suspense } from "react";
import { FilamentTable } from "./_components/filament-table";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { filaments } from "@/server/db/schema";

export const experimental_ppr = true;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getFilamentData() {
  // mock slow db query
  const data = await wait(1).then(() =>
    db.select().from(filaments).limit(11000),
  );
  return data;
}

export default async function HomePage() {
  const filamentData = await getFilamentData();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          3D Filament Profiles Mock
        </h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FilamentTable data={filamentData} />
      </Suspense>
    </main>
  );
}

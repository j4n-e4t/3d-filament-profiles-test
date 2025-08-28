"use cache";
import { DataTable } from "@/components/ui/data-table";
import { filamentColumns } from "./filament-columns";
import { db } from "@/server/db";
import { filaments } from "@/server/db/schema";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function FilamentTable() {
  // mock slow db query
  const data = await wait(7000).then(() =>
    db.select().from(filaments).limit(11000),
  );

  return (
    <>
      <div className="space-y-6">
        <DataTable
          columns={filamentColumns}
          data={data}
          searchKey="name"
          searchPlaceholder="Search filaments..."
        />
      </div>
    </>
  );
}

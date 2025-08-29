"use cache";

import { FilamentTable as FilamentTableComponent } from "@/app/_components/filament-table";
import { getFullFilamentTableData } from "@/utils/supabase/queries";
import Image from "next/image";

export async function FilamentTable() {
  const { data, total, totalTime, timestamp } =
    await getFullFilamentTableData();

  return (
    <>
      <FilamentTableComponent data={data} />
      <div className="bg-accent mt-4 flex flex-col gap-2 rounded-md p-4 text-sm text-gray-500">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Image src="/supabase.svg" alt="Supabase" width={16} height={16} />
          Database Query Details
        </h2>{" "}
        <p>Total time of last db query: {totalTime.toFixed(2)}ms</p>
        <p>Total rows: {total}</p>
        <p>Timestamp: {timestamp}</p>
      </div>
    </>
  );
}

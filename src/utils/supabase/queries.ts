import type { Filament } from "@/app/_components/filament-table";
import { createSupabaseServerAdminClient } from "./server";

export async function getFullFilamentTableData() {
  const startTime = performance.now();
  const supabase = await createSupabaseServerAdminClient();

  // get the total count of rows
  const { count } = await supabase
    .from("filament")
    .select("*", { count: "exact" });

  // we can get a max of 1000 rows at a time
  // make x requests to get the total data
  if (!count) throw new Error("No count found");
  const numRequests = Math.ceil(count / 1000);

  const allData: Filament[] = [];

  for (let i = 0; i < numRequests; i++) {
    const { data: chunkData, error } = await supabase
      .from("filament")
      .select("*")
      .limit(1000)
      .range(i * 1000, (i + 1) * 1000 - 1);

    if (error) throw error;
    if (chunkData) {
      allData.push(...chunkData);
    }
  }

  const totalTime = performance.now() - startTime;

  return {
    data: allData.reverse(),
    total: count,
    totalTime,
    timestamp: new Date().toISOString(),
  };
}

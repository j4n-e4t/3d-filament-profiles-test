"use client";

import { DataTable } from "@/components/ui/data-table";
import { filamentColumns, getFilamentSearchText } from "./filament-columns";

export type Filament = {
  id: number;
  brand: string;
  material: string;
  color: string | null;
  hexColor: string | null;
  diameter: number;
  weight: number | null;
  remainingWeight: number | null;
  price: number | null;
  purchaseDate: Date | null;
  nozzleTemp: number | null;
  bedTemp: number | null;
  printSpeed: number | null;
  retractionDistance: number | null;
  retractionSpeed: number | null;
  flowRate: number | null;
  notes: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};

// Global filter function for multi-field fuzzy search
const filamentGlobalFilter = (row: any, columnId: string, value: string) => {
  if (!value) return true;

  const searchText = getFilamentSearchText(row.original);
  const searchValue = value.toLowerCase();

  // Simple fuzzy matching - check if all search terms are contained
  const searchTerms = searchValue
    .split(/\s+/)
    .filter((term) => term.length > 0);
  return searchTerms.every((term) => searchText.includes(term));
};

interface FilamentTableProps {
  data: Filament[];
}

export function FilamentTable({ data }: FilamentTableProps) {
  return (
    <>
      <div className="space-y-6">
        <DataTable
          columns={filamentColumns}
          data={data}
          searchPlaceholder="Search by brand, material, or color... (e.g., 'bambu pla')"
          globalFilterFn={filamentGlobalFilter}
          filterKeys={["brand", "material", "color"]}
        />
      </div>
    </>
  );
}

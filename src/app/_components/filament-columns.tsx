"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { Filament } from "./filament-table";

// Add computed search field for multi-field fuzzy search
export const getFilamentSearchText = (filament: Filament): string => {
  return [filament.brand, filament.material, filament.color || ""]
    .join(" ")
    .toLowerCase();
};

export const filamentColumns: ColumnDef<Filament>[] = [
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: "material",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Material" />
    ),
    cell: ({ row }) => <div>{row.getValue("material")}</div>,
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      const color = row.getValue("color") as string | null;
      return <div>{color ?? "-"}</div>;
    },
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "hex_color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hex Color" />
    ),
    cell: ({ row }) => {
      const hexColor = row.getValue("hex_color") as string | null;
      if (!hexColor) return <div>-</div>;

      return (
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded border border-gray-300"
            style={{ backgroundColor: hexColor }}
            title={hexColor}
          />
          <span className="font-mono text-sm">{hexColor}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "diameter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diameter" />
    ),
    cell: ({ row }) => {
      const diameter = row.getValue("diameter") as number;
      return <div>{diameter}mm</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "nozzle_temp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nozzle Temp" />
    ),
    cell: ({ row }) => {
      const temp = row.getValue("nozzle_temp");
      return <div>{temp ? `${temp}°C` : "-"}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "bed_temp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bed Temp" />
    ),
    cell: ({ row }) => {
      const temp = row.getValue("bed_temp");
      return <div>{temp ? `${temp}°C` : "-"}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
];

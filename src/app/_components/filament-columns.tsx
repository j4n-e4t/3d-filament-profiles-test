"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Edit, Trash2 } from "lucide-react"

export type Filament = {
  id: number
  name: string
  brand: string
  material: string
  color: string | null
  diameter: number
  weight: number | null
  remainingWeight: number | null
  price: number | null
  purchaseDate: Date | null
  nozzleTemp: number | null
  bedTemp: number | null
  printSpeed: number | null
  retractionDistance: number | null
  retractionSpeed: number | null
  flowRate: number | null
  notes: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date | null
}

interface FilamentColumnsProps {
  onEdit: (filament: Filament) => void
  onDelete: (id: number) => void
}

export function createFilamentColumns({ onEdit, onDelete }: FilamentColumnsProps): ColumnDef<Filament>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "brand",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Brand" />
      ),
      cell: ({ row }) => <div>{row.getValue("brand")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "material",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Material" />
      ),
      cell: ({ row }) => <div>{row.getValue("material")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "color",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Color" />
      ),
      cell: ({ row }) => {
        const color = row.getValue("color")
        return <div>{color ?? "-"}</div>
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "diameter",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Diameter" />
      ),
      cell: ({ row }) => {
        const diameter = row.getValue("diameter") as number
        return <div>{diameter}mm</div>
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "weight",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Weight" />
      ),
      cell: ({ row }) => {
        const weight = row.getValue("weight")
        const remainingWeight = row.original.remainingWeight
        
        if (remainingWeight && weight) {
          return <div>{remainingWeight}g / {weight}g</div>
        } else if (weight) {
          return <div>{weight}g</div>
        } else {
          return <div>-</div>
        }
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "nozzleTemp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nozzle Temp" />
      ),
      cell: ({ row }) => {
        const temp = row.getValue("nozzleTemp")
        return <div>{temp ? `${temp}°C` : "-"}</div>
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "bedTemp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bed Temp" />
      ),
      cell: ({ row }) => {
        const temp = row.getValue("bedTemp")
        return <div>{temp ? `${temp}°C` : "-"}</div>
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        )
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const filament = row.original
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(filament)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(filament.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ]
}

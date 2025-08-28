"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  filterKeys?: string[];
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  filterKeys = [],
  globalFilter,
  onGlobalFilterChange,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    (globalFilter && globalFilter.length > 0);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {(searchKey || onGlobalFilterChange) && (
          <Input
            placeholder={searchPlaceholder}
            value={
              onGlobalFilterChange
                ? globalFilter || ""
                : ((table.getColumn(searchKey!)?.getFilterValue() as string) ??
                  "")
            }
            onChange={(event) => {
              if (onGlobalFilterChange) {
                onGlobalFilterChange(event.target.value);
              } else if (searchKey) {
                table.getColumn(searchKey)?.setFilterValue(event.target.value);
              }
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {/* Dropdown filters */}
        {filterKeys.map((filterKey) => {
          const column = table.getColumn(filterKey);
          if (!column) return null;

          const uniqueValues = Array.from(
            column.getFacetedUniqueValues().keys()
          ).sort();

          return (
            <Select
              key={filterKey}
              value={(column.getFilterValue() as string) ?? "all"}
              onValueChange={(value) => {
                if (value === "all") {
                  column.setFilterValue(undefined);
                } else {
                  column.setFilterValue(value);
                }
              }}
            >
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder={`All ${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}s`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}s</SelectItem>
                {uniqueValues.map((value) => (
                  <SelectItem key={value} value={value as string}>
                    {value as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              if (onGlobalFilterChange) {
                onGlobalFilterChange("");
              }
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Column visibility toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8">
            <Settings2 className="mr-2 h-4 w-4" />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id === "brand"
                    ? "Brand"
                    : column.id === "material"
                    ? "Material"
                    : column.id === "color"
                    ? "Color"
                    : column.id === "hexColor"
                    ? "Hex Color"
                    : column.id === "diameter"
                    ? "Diameter"
                    : column.id === "weight"
                    ? "Weight"
                    : column.id === "nozzleTemp"
                    ? "Nozzle Temp"
                    : column.id === "bedTemp"
                    ? "Bed Temp"
                    : column.id === "isActive"
                    ? "Status"
                    : column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

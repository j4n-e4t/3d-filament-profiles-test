"use client";

import { api } from "@/trpc/react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { createFilamentColumns } from "./filament-columns";

export function FilamentTable() {
  const { data, isLoading } = api.filament.getAll.useQuery({});

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading filaments...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const columns = createFilamentColumns({
    onEdit: () => {},
    onDelete: () => {},
  });

  const filaments = data?.filaments ?? [];

  return (
    <>
      <div className="space-y-6">
        <DataTable
          columns={columns}
          data={filaments}
          searchKey="name"
          searchPlaceholder="Search filaments..."
        />
      </div>
    </>
  );
}

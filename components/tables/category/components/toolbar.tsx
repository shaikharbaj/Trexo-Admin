"use client";
import React from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { filterSearchText } from "@/service/datatable.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/components/data-table-view-options";
import { Filter } from "./filter";

interface ToolbarProps {
  table: Table<any>;
}

const statusOptions = [
  {
    value: "true",
    label: "Active",
  },
  {
    value: "false",
    label: "Inactive",
  },
];

const viewOptionLabel = {
  category_name: "Category",
  industry: "Industry",
  is_active: "Status"
}

export function Toolbar({ table }: ToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  //Function to handel global filter
  const handleFilterChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      await filterSearchText(event.target.value);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder="Search..."
        onChange={handleFilterChange}
        className="h-8 min-w-[200px] max-w-sm"
      />

      {statusOptions.length && (
        <Filter title="Status" options={statusOptions} />
      )}
      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}
      <DataTableViewOptions table={table} optionLabel={viewOptionLabel} />
    </div>
  );
}

"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../../../dataTable/components/data-table-view-options";
import { Table } from "@tanstack/react-table";
import { Filter } from "./filter";

interface ToolbarProps {
  table: Table<any>;
}

const statusOptions = [
  {
    value:"active",
    label:"Active"
  },
  {
    value:"inactive",
    label:"Inactive"
  }
]

export function Toolbar({ table }: ToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    table.getColumn("title")?.setFilterValue(value);
  };
  const statusColumn = table.getColumn("status");

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder="Filter industry..."
        value={table.getColumn("title")?.getFilterValue() as string || ""}
        onChange={handleFilterChange}
        className="h-8 min-w-[200px] max-w-sm"
      />

      {statusColumn && (
        <Filter
          column={statusColumn}
          title="Status"
          options={statusOptions}
        />
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
      <DataTableViewOptions table={table} />
    </div>

  );
}

"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";

interface Industry {
  uuid?: string;
  industry_name?: string;
  is_active?: string;
  slug?: string;
}

export const columns: ColumnDef<Industry>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "industry_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Industry Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("industry_name")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {      
      // console.log('in header filetr function ');
      // console.log('row ', row);
      // console.log('id ', id);
      // console.log('value ', value);
      // return true;
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge
            color={
              (row.getValue('is_active') === true && "success") ||
              (row.getValue('is_active') === false && "destructive") || "default"
            }>
            {row.getValue('is_active') === true ? 'Active' : "Inactive"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {     
      // console.log('in status filetr function ');
      // console.log('row ', row);
      // console.log('id ', id);
      // console.log('value ', value);
      // return true; 
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "action",
    cell: ({ row }) => <RowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];

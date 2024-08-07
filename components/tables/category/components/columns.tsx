"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";

interface Industry {
  industry: string;
  category: string;
  status: string;
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
    accessorKey: "category_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      if(row.getValue("category_name")) {
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("category_name")}
            </span>
          </div>
        );
      }
      return "N/A";
    },
  },
  {
    accessorKey: "industry",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Industry" />
    ),
    cell: ({ row }) => {
      let industryObj: any = row.getValue('industry');
      if(industryObj?.industry_name) {
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {industryObj.industry_name}
            </span>
          </div>
        );
      }
      return 'N/A'
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let isActiveValue = row.getValue('is_active');
      return (
        <div className="flex items-center">
          <Badge
            color={
              (isActiveValue === true && "success") ||
              (isActiveValue === false && "destructive") || "default"
            }>
            {isActiveValue === true ? 'Active' : "Inactive"}
          </Badge>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];

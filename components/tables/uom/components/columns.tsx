"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";

interface Uom {
  uuid?: string;
  uom_code?: string;
  rounding_rule?: string;
  rounding_value?: string;
  decimal_scale?: string;
  uom_category: UomCategory[];
}

interface UomCategory {
  Category: {
    category_name: string;
  };
}

export const columns: ColumnDef<Uom>[] = [
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
    accessorKey: "uom_code",
    header: ({ column }) => (
      <ColumnHeader column={column} title="UOM Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("uom_code")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "uom_category",
    header: ({ column }) => (
      <ColumnHeader column={column} title="UOM Categories" />
    ),
    cell: ({ row }) => {
      const uomCategories = row.getValue("uom_category") as UomCategory[];
      const categoryNames = uomCategories
        .map((item) => item.Category.category_name)
        .join(", ");

      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {categoryNames}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const uomCategories = row.getValue(id) as UomCategory[];
      const categoryNames = uomCategories
        .map((item) => item.Category.category_name)
        .join(", ");

      return categoryNames.includes(value);
    },
    enableSorting: false,
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
            variant="soft"
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
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("created_at"))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("updated_at"))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "action",
    // header: "Action",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <RowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];

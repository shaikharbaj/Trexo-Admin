"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { getS3BasePath } from "@/config/aws";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";

interface Brand {
  uuid?: string;
  brand_name?: string;
  brandCategory?: IBrandCategory[];
  is_active?: string;
  slug?: string;
}
interface IBrandCategory {
  category: {
    category_name: string;
  };
}

const AWS_URL = getS3BasePath();

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
    accessorKey: "brand_name",
    header: ({ column }) => <ColumnHeader column={column} title="Brand Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("brand_name")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Brand Image" />
    ),
    cell: ({ row }) => {
      const brandName = row.getValue("brand_name") as string;

      return (
        <div className="flex gap-2">
          {row.original.image ? (
            <Image
              className="w-16 h-16 rounded-[100%]"
              src={`${AWS_URL}/brand/${row.original.id}/small/${row.original.image}`}
              width={200}
              height={200}
              alt={row.original.brand}
            />
          ) : (
            <Avatar className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <AvatarFallback>
                {brandName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Brand Categories" />
    ),
    cell: ({ row }) => {
      const brandCategories = row.getValue("brandCategory") as IBrandCategory[];
      const categoryNames = brandCategories
        ?.map((item) => item.category.category_name)
        ?.join(", ");

      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {categoryNames}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const brandCategories = row.getValue(id) as IBrandCategory[];
      const categoryNames = brandCategories
        .map((item) => item.category.category_name)
        .join(", ");

      return categoryNames.includes(value);
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge
            variant="soft"
            color={
              (row.getValue("is_active") === true && "success") ||
              (row.getValue("is_active") === false && "destructive") ||
              "default"
            }
          >
            {row.getValue("is_active") === true ? "Active" : "Inactive"}
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
    header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
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
    header: ({ column }) => <ColumnHeader column={column} title="Updated At" />,
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
    id: "actions",
    header: ({ column }) => <ColumnHeader column={column} title="Action" />,
    cell: ({ row }) => <RowActions row={row} />,
  },
];

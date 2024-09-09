"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import Image from 'next/image';
import { getS3BasePath } from "@/config/aws";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Industry {
  id: string;
  industry: string;
  category: string;
  status: string;
  image: string;
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
    accessorKey: "image",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const categoryName = row.getValue("category_name") as string;

      return (
        <div className="flex gap-2">
          {row.original.image ? (
             <Image
              className="w-16 h-16 rounded-[100%]"
              src={`${AWS_URL}/category/${row.original.id}/small/${row.original.image}`}
              width={200}
               height={200}
               alt={row.original.category}
              />
              ) : (
            <Avatar className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <AvatarFallback>
                {categoryName.charAt(0).toUpperCase()}
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
    accessorKey: "created_at",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      if(row.getValue("created_at")) {
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {formatDate(row.getValue("created_at"))}
            </span>
          </div>
        );
      }
      return "N/A";
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      if(row.getValue("updated_at")) {
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {formatDate(row.getValue("updated_at"))}
            </span>
          </div>
        );
      }
      return "N/A";
    },
    enableSorting: true,
    enableHiding: false,
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
            variant="soft"
            className=" capitalize"
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
    header: ({ column }) => (
      <ColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <RowActions row={row} />,
  },
];

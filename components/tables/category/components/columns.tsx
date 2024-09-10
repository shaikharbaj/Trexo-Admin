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
import { useState } from "react";
import { toggleCategory } from "@/service/category.service";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface Industry {
  id: string;
  uuid: string
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
      const categoryName = row.getValue("category_name") as string;
      if (row.getValue("category_name")) {
        return (
          <div className="flex gap-2 items-center">
            {row.original.image ? (
              <Image
                className="w-8 h-8 rounded-[100%]"
                src={`${AWS_URL}/category/${row.original.id}/small/${row.original.image}`}
                width={200}
                height={200}
                alt={categoryName || "Category Image"}
              />
            ) : (
              <Avatar className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <AvatarFallback>
                  {categoryName ? categoryName.charAt(0).toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
            )}
            <span className="max-w-[500px] truncate font-medium">
              {categoryName || "Unknown Category"}
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
      if (industryObj?.industry_name) {
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
      if (row.getValue("created_at")) {
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
      if (row.getValue("updated_at")) {
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
      const [activate, setActivate] = useState<boolean>(row.getValue('is_active'))
      const handleToggle = (uuid: any) => {
        try {
          setActivate((prevActivate) => {
            const newActivate = !prevActivate;
            const payload = {
              uuid: uuid,
              is_active: newActivate
            };
            // Call toggle with the updated value of activate
            toggleCategory(payload).then((response) => {
              if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
                return;
              } else {
                toast.success(response?.message);
              }
            }).catch((error) => {
              toast.error(error?.message);
            });

            // Return the new state
            return newActivate;
          });
        } catch (error: any) {
          toast.error(error?.message);
        }
      }
      return (
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {row.getValue('is_active') === true ? (<Switch color="success" id="switch_success" defaultChecked onClick={() => { handleToggle(row.original.uuid) }} />) : (<Switch color="success" id="switch_success" onClick={() => { handleToggle(row.original.uuid) }} />)}
          </div>
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
    id: "actions",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <RowActions row={row} />,
  },
];

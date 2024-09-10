"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { getS3BasePath } from "@/config/aws";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { toggleBrands } from "@/service/brand.service";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface Brand {
  id: number;
  uuid?: string;
  image?: string;
  brand_name: string;
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

export const columns: ColumnDef<Brand>[] = [
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
      const brandName = row.getValue("brand_name") as string;

      return (
        <div className="flex gap-2 items-center">
          {row.original.image ? (
            <Image
              className="w-8 h-8 rounded-[100%]"
              src={`${AWS_URL}/brand/${row.original.id}/small/${row.original.image}`}
              width={200}
              height={200}
              alt={brandName || "Brand Image"}
            />
          ) : (
            <Avatar className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <AvatarFallback>
                {brandName ? brandName.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {brandName || "Unknown Brand"}
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

        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brandCategory",
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
            toggleBrands(payload).then((response) => {
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

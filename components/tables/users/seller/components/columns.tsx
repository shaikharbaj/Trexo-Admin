"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Supplier {
  uuid?: string;
  unique_id: string;
  profile_url: string;
  first_name: string;
  middle_name: string;
  category: string;
  product_category_id: string;
  last_name: string;
  email: string;
  mobile_number: string;
  is_active?: string;
}

export const columns: (categoryMeta: any) => ColumnDef<Supplier>[] = (
  categoryMeta
) => [
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
    accessorKey: "unique_id",
    header: ({ column }) => <ColumnHeader column={column} title="Id" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("unique_id")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "profile_url",
    header: ({ column }) => <ColumnHeader column={column} title="Image" />,
    cell: ({ row }) => {
      const profile_url: any = row.getValue("profile_url");
      const logo = row?.original?.first_name?.split("")[0];
      return (
        <div className="font-medium text-card-foreground/80">
          <div className="flex space-x-3 rtl:space-x-reverse items-center">
            <Avatar className="rounded-full">
              {profile_url ? (
                <AvatarImage src={profile_url} />
              ) : (
                <AvatarFallback>{logo}</AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "seller_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Seller Name" />
    ),
    cell: ({ row }) => {
      const firstName = row?.original?.first_name;
      const middleName = row?.original?.middle_name;
      const lastName = row?.original?.last_name;
      const fullName = [firstName, middleName, lastName]
        .filter((name) => name && name.trim() !== "")
        .join(" ");
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">{fullName}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "product_category_id",
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const category: string[] = row.getValue("product_category_id");
      if (category && Array.isArray(category)) {
        const categoryNames = category
          .map((id) => categoryMeta[id] || "Unknown")
          .join(", ");
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {categoryNames}
            </span>
          </div>
        );
      }
      return "N/A";
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "mobile_number",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Mobile Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("mobile_number")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge
            variant="soft"
            color={
              (row.getValue("status") === "ACTIVE" && "success") ||
              (row.getValue("status") === "INACTIVE" && "destructive") ||
              (row.getValue("status") === "PENDING" && "warning") ||
              (row.getValue("status") === "SUSPENDED" && "destructive") ||
              (row.getValue("status") === "BLOCKED" && "destructive") ||
              "default"
            }
          >
            {row.getValue("status") === "ACTIVE"
              ? "Active"
              : row.getValue("status") === "INACTIVE"
              ? "Inactive"
              : row.getValue("status") === "PENDING"
              ? "Pending"
              : row.getValue("status") === "SUSPENDED"
              ? "Suspended"
              : row.getValue("status") === "BLOCKED"
              ? "Blocked"
              : "Unknown"}
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
];

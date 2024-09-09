"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Consumer {
  uuid?: string;
  unique_id: string;
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  is_active?: string;
}

export const columns: ColumnDef<Consumer>[] = [
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
      const uuid = row?.original?.uuid;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link
              href={`/users/consumer/${uuid}/basic-details`}
              className="text-blue-600 hover:underline"
            >
              {row.getValue("unique_id")}
            </Link>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const firstName = row?.original?.first_name;
      const middleName = row?.original?.middle_name;
      const lastName = row?.original?.last_name;
      const fullName = [firstName, middleName, lastName]
        .filter((name) => name && name.trim() !== "")
        .join(" ");
      const profile_url: any = row.getValue("profile_url");
      const logo = row?.original?.first_name?.split("")[0];
      return (
        <div className="flex gap-2 items-center">
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
          <span className="max-w-[500px] truncate font-medium">{fullName}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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

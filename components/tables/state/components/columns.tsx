"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { toggleState } from "@/service/state.service";

interface State {
  uuid: string;
  state_name: string;
  country_name: string;
  short_code: string;
  is_active: string;
}

export const columns: ColumnDef<State>[] = [
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
    accessorKey: "state_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="State Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("state_name")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Country Name" />
    ),
    cell: ({ row }) => {
      let countryObj: any = row.getValue("country");
      if (countryObj?.country_name) {
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {countryObj.country_name}
            </span>
          </div>
        );
      }
      return "N/A";
    },
  }, {
    accessorKey: "short_code",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Short Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("short_code")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
            toggleState(payload).then((response) => {
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
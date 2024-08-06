"use client";
import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Skeleton from "../tables/skeleton";
import { DataTablePagination } from "./components/data-table-pagination";

interface DataTableProps<TData> {
  isLoading: boolean;
  tableObj: any;
}
export function DataTable<TData>({
  isLoading,
  tableObj,
}: DataTableProps<TData>) {
  const headerGroups = tableObj.getHeaderGroups();

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {headerGroups.map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableObj.getRowModel().rows?.length ? (
              tableObj.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headerGroups.length}
                  className="!text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={tableObj} />
    </>
  );
}

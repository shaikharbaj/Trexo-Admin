import {
  ChevronsLeft,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { navigatePage, setPage } from "@/service/pagination.service";

interface DataTablePaginationProps {
  table: Table<any>;
}

export function DataTablePagination({ table }: DataTablePaginationProps) {
  const { meta } = useAppSelector((state: RootState) => state.paginate);

  // Helper functions to handle pagination
  const handlePageSizeChange = async (value: string) => {
    try {
      await setPage(Number(value));
    } catch (error) {
      console.log(error);
    }
  };

  const goToPage = async (pageIndex: number) => {
    try {
      await navigatePage(pageIndex);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-2 justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-wrap items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">Rows per page</p>
          <Select
            value={meta.perPage.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={meta.perPage.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground">
          Page {meta.currentPage} of {meta.lastPage}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goToPage(1)}
            disabled={meta.currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4 rtl:rotate-180" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(meta.currentPage - 1)}
            disabled={meta.currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(meta.currentPage + 1)}
            disabled={meta.currentPage === meta.lastPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goToPage(meta.lastPage)}
            disabled={meta.currentPage === meta.lastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}

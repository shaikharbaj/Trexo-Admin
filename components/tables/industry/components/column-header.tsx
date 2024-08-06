import {
  ChevronDown,
  ChevronUp,
  XCircle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { sortColumn } from "@/service/datatable.service";
import toast from "react-hot-toast";

interface ColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  slug?: string;
  className?: string;
}

export function ColumnHeader({ column, title, className, slug }: ColumnHeaderProps) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSorting = async (name: string, order: string) => {
    try {
      await sortColumn(name,order);
    } catch (error:any) {
      toast.error(error?.message);
    }
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ChevronDown className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : (
              <></>
            )}
          </Button>
        </DropdownMenuTrigger>
        {slug && (
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleSorting(slug, 'asc')}>
              <ChevronUp className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSorting(slug, 'desc')}>
              <ChevronDown className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}

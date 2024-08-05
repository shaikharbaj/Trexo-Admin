import React, { Fragment, useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { fetchIndustryWithFilter } from "@/service/industry.service";
import toast from "react-hot-toast";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ITableProps {
  trans: any;
  setRefreshComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndustryTable: React.FC<ITableProps> = ({
  trans,
  setRefreshComponent,
}) => {
  const { isLoading, list } = useAppSelector(
    (state: RootState) => state.industry
  );
  const { meta } = useAppSelector((state: RootState) => state.paginate);
  const [seachFilter, setSearchFilter] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const handleFetchIndustry = async () => {
    const payload = {
      page_size: meta.perPage,
      page: meta.currentPage,
      searchText: seachFilter,
    };
    try {
      const response: any = await fetchIndustryWithFilter(payload);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (seachFilter.length > 0) {
      setIsFiltered(true);
    }
    handleFetchIndustry();
  }, [meta.perPage, meta.currentPage, seachFilter]);

  const handleResetFilter = () => {
    setRefreshComponent((prevState) => !prevState);
  };

  return (
    <Fragment>
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Input
            placeholder="Filter industry..."
            onChange={(e) => setSearchFilter(e.target.value)}
            className="h-8 min-w-[200px] max-w-sm"
            value={seachFilter}
          />

          {/* {statusColumn && (
                        <Filter
                            column={statusColumn}
                            title="Status"
                            options={statusOptions}
                        />
                    )} */}
          {isFiltered && (
            <Button
              variant="outline"
              onClick={handleResetFilter}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTable data={list} columns={columns} isLoading={isLoading} />
      </div>
    </Fragment>
  );
};

export default IndustryTable;

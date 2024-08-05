import React, { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { fetchTableData } from "@/service/datatable.service";

interface ITableProps {
  trans: any;
}

const IndustryTable: React.FC<ITableProps> = ({ trans }) => {
  const { isLoading, refresh, data, filters, pagination } = useAppSelector(
    (state: RootState) => state.datatable
  );

  useEffect(() => {
    handleFetchIndustry();
  }, [
    filters.searchText,
    filters.is_active,
    pagination.currentPage,
    pagination.perPage,
  ]);

  // Function to fetch industry data
  const handleFetchIndustry = async () => {
    try {
      const datatablePayload = {
        url: "/industry",
        page_size: pagination.perPage,
        page: pagination.currentPage,
        searchText: filters.searchText,
        is_active: filters.is_active,
      };
      const response = await fetchTableData(datatablePayload);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Fragment>
      <div className="space-y-4">
        <DataTable data={data} columns={columns} isLoading={isLoading} />
      </div>
    </Fragment>
  );
};

export default IndustryTable;

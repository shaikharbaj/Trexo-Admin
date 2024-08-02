import React, { Fragment, useEffect, useState } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { fetchIndustryWithFilter } from '@/service/industry.service';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/redux/store';

interface ITableProps {
    trans: {
        [key: string]: string;
    };
    onRefresh?: () => void; // Add the onRefresh prop
}

const IndustryTable: React.FC<ITableProps> = ({ trans,onRefresh }) => {
    const { isLoading, list } = useAppSelector((state: RootState) => state.industry);
    const { meta } = useAppSelector((state: RootState) => state.paginate);
    const [pageSize, setPageSize] = useState<number>(meta.perPage);
    const [currentPage, setCurrentPage] = useState<number>(meta.currentPage);
    const [seachFilter, setSearchFilter] = useState<string>("");

    // Synchronize state with Redux store
    useEffect(() => {
        setPageSize(meta.perPage);
        setCurrentPage(meta.currentPage);
    }, [meta.perPage, meta.currentPage]);


    const handleFetchIndustry = async () => {
        const payload = {
            page_size: pageSize,
            page: currentPage,
            searchText: seachFilter
        };
        try {
            const response: any = await fetchIndustryWithFilter(payload);
            if (response?.status === true && response?.statusCode === 200) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        handleFetchIndustry()
    }, [pageSize, currentPage])

    return (
        <Fragment>
            <DataTable
                data={list}
                columns={columns}
                isLoading={isLoading}
            />
        </Fragment>
    )
}

export default IndustryTable;
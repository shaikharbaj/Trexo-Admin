import { DataTable } from '@/components/dataTable/components/data-table';
import React, { Fragment } from 'react';
import { columns } from './table-columns';

interface ITableProps {
    trans: {
        [key: string]: string;
    };
}

const data = [
    {
        title: "Solar",
        status: "active",
    },
    {
        title: "Health Care",
        status: "inactive",
    }
]

const IndustryTable: React.FC<ITableProps> = ({ trans }) => {

    return (
        <Fragment>
            <DataTable
                data={data}
                columns={columns}
            />
        </Fragment>
    )
}

export default IndustryTable;
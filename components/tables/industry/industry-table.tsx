import React, { Fragment } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

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
import { columns } from '@/components/dataTable/components/columns';
import { DataTable } from '@/components/dataTable/components/data-table';
import { data } from '@/components/dataTable/data';
import React, { Fragment } from 'react';

interface ITableProps {
    trans: {
        [key: string]: string;
    };
}

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
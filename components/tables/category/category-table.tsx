import React, { Fragment } from 'react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface ITableProps {
    trans: {
        [key: string]: string;
    };
}

const data = [
    {
        industry: "Solar",
        category: "Solar Panels",
        status: "active",
    },
    {
        industry: "HealthCare",
        category: "Medical Equipments",
        status: "inactive",
    }
]

const CategoryTable: React.FC<ITableProps> = ({ trans }) => {
    return (
        <Fragment>
            <DataTable
                data={data}
                columns={columns}
            />
        </Fragment>
    )
}

export default CategoryTable;
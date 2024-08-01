"use client";
import React, { useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { CreateUpdateCategoryModal } from "@/components/modals";
import { CategoryTable } from "@/components/tables";

interface ICategoryProps {
    trans: {
        [key: string]: string;
    };
}

const CategoryList: React.FunctionComponent<ICategoryProps> = ({
    trans,
}) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    return (
        <div className="space-y-6">
            <div className="flex items-center flex-wrap justify-between gap-4">
                <Breadcrumbs>
                    <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                    <BreadcrumbItem>Master</BreadcrumbItem>
                    <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="space-y-6">
                <div className="flex items-center flex-wrap justify-between gap-4">
                    <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                        Category
                    </div>
                    <div className="flex-none flex items-center justify-end gap-4">
                        <Button onClick={() => setModalIsOpen(true)}>
                            <Icon icon="heroicons:plus" className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            Add New
                        </Button>
                        <CreateUpdateCategoryModal
                            modalIsOpen={modalIsOpen}
                            setModalIsOpen={setModalIsOpen}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <CategoryTable trans={trans} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CategoryList;
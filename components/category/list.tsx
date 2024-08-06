"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateUpdateCategoryModal } from "@/components/modals";
import { CategoryTable } from "@/components/tables";

interface ICategoryProps {
}

const CategoryList: React.FunctionComponent<ICategoryProps> = () => {
    const t = useTranslations("CategoryPage");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    return (
        <div className="space-y-6">
            <div className="flex items-center flex-wrap justify-between gap-4">
                <Breadcrumbs>
                    <BreadcrumbItem href="/dashboard">{t('Dashboard')}</BreadcrumbItem>
                    <BreadcrumbItem>{t('Master')}</BreadcrumbItem>
                    <BreadcrumbItem>{t('Category')}</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="space-y-6">
                <div className="flex items-center flex-wrap justify-between gap-4">
                    <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                    {t('Category')}
                    </div>
                    <div className="flex-none flex items-center justify-end gap-4">
                        <Button onClick={() => setModalIsOpen(true)}>
                            <Icon icon="heroicons:plus" className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            {t('Add New')}
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
                        <CategoryTable trans={t} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CategoryList;

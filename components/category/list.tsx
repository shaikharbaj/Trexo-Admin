"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { openPopup } from "@/service/modal.service";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryTable } from "@/components/tables";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { CreateUpdateCategoryModal } from "@/components/modals";
import { Button } from "@/components/ui/button";


interface ICategoryProps {}

const CategoryList: React.FunctionComponent<ICategoryProps> = () => {
  const t = useTranslations("CategoryPage");
  const { refresh } = useAppSelector((state: RootState) => state.datatable);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  //Function to opem modal
  const handleOpenModal = async () => {
    await openPopup('category', 'Add Category', 'add');
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
          <BreadcrumbItem>{t("Master")}</BreadcrumbItem>
          <BreadcrumbItem>{t("Category")}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {t("Category")}
          </div>
          <div className="flex-none flex items-center justify-end gap-4">
            <Button onClick={handleOpenModal}>
              <Icon
                icon="heroicons:plus"
                className="w-5 h-5 ltr:mr-2 rtl:ml-2"
              />
              {t("Add New")}
            </Button>
            <CreateUpdateCategoryModal/>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card key={String(refresh)}>
          <CardContent className="pt-6">
            <CategoryTable trans={t} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryList;

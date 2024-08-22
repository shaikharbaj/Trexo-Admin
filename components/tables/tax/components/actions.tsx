import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { deleteTax, fetchTaxById } from "@/service/tax.service";
import toast from "react-hot-toast";
import { openPopup } from "@/service/modal.service";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const t = useTranslations("TaxPage");

  const handleRecordDelete = async (uuid: string) => {
    try {
      const response: any = await deleteTax(uuid);
      if (response?.status === true && response?.statusCode === 200) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleOpenModal = async (uuid: string) => {
    try {
      const response: any = await fetchTaxById(uuid);
      if (response?.status === true && response?.statusCode === 200) {
        await openPopup(
          "tax",
          `${t("Edit")} ${t("Tax")}`,
          "edit",
          response.data
        );
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleOpenModal(row.original.uuid)}
      >
        <Icon icon="heroicons:pencil" className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleRecordDelete(row.original.uuid)}
      >
        <Icon icon="heroicons:trash" className="h-4 w-4" />
      </Button>
    </div>
  );
}
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { BrandForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { closePopup } from "@/service/modal.service";
import { createBrand, updateBrand } from "@/service/brand.service";
import { brandSchema } from "@/validations";

interface IModalProps {
  trans: any;
}

const CreateUpdateBrandModal: React.FC<IModalProps> = ({ trans }) => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [isPending, startTransition] = React.useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    mode: "all",
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brand_name: "",
      brand_description: "",
      meta_title: "",
      category_ids: "",
      meta_keywords: "",
      meta_description: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue(
        "category_ids",
        data?.brandCategory.map((item: any) => item.category.uuid) || []
      );
      setValue("brand_name", data?.brand_name);
      setValue("brand_description", data?.brand_description);
      setValue("meta_title", data?.meta_title);
      setValue("meta_keywords", data?.meta_keywords);
      setValue("meta_description", data?.meta_description);
    }
  }, [data]);

  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;
        console.log(payload);
        //Converting category ids in json
        let categoryIds = payload.category_ids.split(",");
        payload.category_ids = JSON.stringify(categoryIds);
        if (action === "add") {
          console.log(payload);
          response = await createBrand(payload);
        } else {
          response = await updateBrand(data?.uuid, payload);
        }
        if (response?.status === true && response?.statusCode === 200) {
          reset();
          toast.success(response?.message);
          await closePopup();
        } else {
          toast.error(response?.message || trans("An error occurred"));
        }
      } catch (error: any) {
        toast.error(error?.message || trans("An error occurred"));
      }
    });
  };

  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "brand" && isOpen}>
      <DialogContent size="lg" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="h-[350px]">
              <BrandForm
                trans={trans}
                isPending={isPending}
                register={register}
                control={control}
                errors={errors}
              />
            </div>
            <div className=" flex justify-end gap-3 mt-6">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleModalClose}
                >
                  {trans("Cancel")}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending
                  ? trans("Loading") + "..."
                  : action === "add"
                  ? trans("Save")
                  : trans("Update")}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateBrandModal;

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { closePopup } from "@/service/modal.service";
import { CategoryForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IModalProps {}

const CreateUpdateCategoryModal: React.FC<IModalProps> = () => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    //resolver: zodResolver(industrySchema),
    defaultValues: {
      industry_name: "",
    },
  });

  //Function to close the model
  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "category" && isOpen}>
      <DialogContent size="2xl" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            Add Category
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="h-[150px]">
            <CategoryForm />
          </div>
          <div className=" flex justify-end gap-3 mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="button">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateCategoryModal;

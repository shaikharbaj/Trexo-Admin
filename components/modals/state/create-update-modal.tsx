import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { StateForm } from "@/components/forms";
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
import { createState, updateState } from "@/service/state.service";
import { closePopup } from "@/service/modal.service";
import { stateSchema } from "@/validations";

interface IModalProps {}

const CreateUpdateStateModal: React.FC<IModalProps> = () => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [isPending, startTransition] = React.useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: zodResolver(stateSchema),
    defaultValues: {
      country_uuid: "",
      state_name: "",
      short_code: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("state_name", data?.state_name);
      setValue("country_uuid", data?.country?.uuid);
      setValue("short_code", data?.short_code);
    }
  }, [data]);

  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;
        // if (action === "add") {
        //   response = await createState(payload);
        // } else {
        //   response = await updateState(data?.uuid, payload);
        // }

        // if (response?.status === true && response?.statusCode === 200) {
        //   reset();
        //   toast.success(response?.message);
        //   await closePopup();
        // } else {
        //   toast.error(response?.message || "An error occurred.");
        // }
      } catch (error: any) {
        toast.error(error?.message || "An error occurred.");
      }
    });
  };

  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "state" && isOpen}>
      <DialogContent size="lg" hiddenCloseIcon={true}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[300px]">
              <StateForm
                isPending={isPending}
                register={register}
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
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Loading..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateStateModal;

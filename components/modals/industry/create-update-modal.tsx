import { IndustryForm } from "@/components/forms";
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
import { createIndustry, updateIndustry } from "@/service/industry.service";
import { closePopup } from "@/service/modal.service";
import { industrySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IModalProps {}

const CreateUpdateIndustryModal: React.FC<IModalProps> = () => {
    const { isOpen, modalName, modalTitle, action, data } = useAppSelector((state: RootState) => state.modal);
    const [isPending, startTransition] = React.useTransition();
    const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
        mode: 'all',
        resolver: zodResolver(industrySchema),
        defaultValues: {
            industry_name: "",
        },
    });

    useEffect(() => {
        if (data) {
            setValue('industry_name', data?.industry_name);
        }
    }, [data]);
    


    const onSubmit = async (payload: any) => {
        startTransition(async () => {
            try {
                let response: any;
    
                if (action === 'add') {
                    response = await createIndustry(payload);
                } else {
                    response = await updateIndustry(data?.uuid, payload);
                }
    
                if (response?.status === true && response?.statusCode === 200) {
                    reset();
                    toast.success(response?.message);
                    await closePopup();
                } else {
                    toast.error(response?.message || "An error occurred.");
                }
            } catch (error: any) {
                toast.error(error?.message || "An error occurred.");
            }
        });
    };
    

    const handleModalClose = async () => {
        reset();
        await closePopup();
    }

    return (
        <Dialog open={modalName === 'industry' && isOpen}>
            <DialogContent size="lg" hiddenCloseIcon={true}>
                <DialogHeader className="p-0 mb-4">
                    <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                        {modalTitle}
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div className="h-[100px]">
                        <IndustryForm
                            register={register}
                            errors={errors}
                            reset={reset}
                            onSubmit={handleSubmit(onSubmit)}
                            isPending={isPending}
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
                        <Button
                            type="submit"
                            form="industry-form"
                            disabled={isPending}
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPending ? "Loading..." : "Save"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUpdateIndustryModal;

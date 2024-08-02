import { IndustryForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { createIndustry } from "@/service/industry.service";
import { industrySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
    action: string;
}

const CreateUpdateIndustryModal: React.FC<IModalProps> = ({
    modalIsOpen,
    setModalIsOpen,
    action
}) => {

    const [isPending, startTransition] = React.useTransition();
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        mode: 'all',
        resolver: zodResolver(industrySchema),
        defaultValues: {
            industry_name: "",
        },
    });

    const onSubmit = (payload: any) => {
        startTransition(async () => {
            try {
                const response: any = await createIndustry(payload);
                if (response?.status === true && response?.statusCode === 200) {
                    reset();
                    toast.success(response?.message);
                    setModalIsOpen(false);
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        });
    }

    return (
        <Dialog open={modalIsOpen}>
            <DialogContent size="lg" hiddenCloseIcon={true}>
                <DialogHeader className="p-0 mb-4">
                    <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                        {action} Industry
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
                                onClick={() => setModalIsOpen(false)}
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

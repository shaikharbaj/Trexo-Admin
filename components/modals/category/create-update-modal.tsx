import { CategoryForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface IModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
}

const CreateUpdateCategoryModal: React.FC<IModalProps> = ({ modalIsOpen, setModalIsOpen }) => {
    return (
        <Dialog open={modalIsOpen}>
            <DialogContent size="2xl" hiddenCloseIcon={true}>
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
                            <Button type="button" variant="outline" onClick={() => setModalIsOpen(false)}>
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

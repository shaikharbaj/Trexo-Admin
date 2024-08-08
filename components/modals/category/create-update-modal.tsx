import React, { useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
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
import { categorySchema } from "@/validations";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    control,
  } = useForm({
    mode: "all",
    resolver: zodResolver(categorySchema),
    defaultValues: {
      industry_name: "",
      category_type: "",
      category_name: "",
      category_description: "",
      meta_title: "",
      meta_keyword: "",
      meta_description: "",
    },
  });

  const onSubmit = async (payload: any) => {
    console.log("payload ", payload);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[450px]">
              <ScrollArea className="h-full">
                <div className="space-y-5 mb-2">
                  <div className="flex flex-col gap-2">
                    <Label>Industry</Label>
                    <Controller
                      control={control}
                      name="industry_name"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select Industry"
                              className="whitespace-nowrap"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Health Care">
                              Health Care
                            </SelectItem>
                            <SelectItem value="Solar">Solar</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.industry_name && (
                      <div className=" text-destructive">
                        {errors.industry_name.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Category Type</Label>
                    <Controller
                      control={control}
                      name="category_type"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select Category Type"
                              className="whitespace-nowrap"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Health Care">
                              Health Care
                            </SelectItem>
                            <SelectItem value="Solar">Solar</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category_type && (
                      <div className=" text-destructive">
                        {errors.category_type.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Category Name</Label>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="Enter category name"
                      disabled={isPending}
                      {...register("category_name")}
                    />
                    {errors.category_name && (
                      <div className=" text-destructive">
                        {errors.category_name.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Category Description </Label>
                    <Textarea
                      placeholder="Enter category description"
                      rows={4}
                      disabled={isPending}
                      {...register("category_description")}
                    />
                    {errors.category_description && (
                      <div className=" text-destructive">
                        {errors.category_description.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Meta Title</Label>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="Enter meta title"
                      disabled={isPending}
                      {...register("meta_title")}
                    />
                    {errors.meta_title && (
                      <div className=" text-destructive">
                        {errors.meta_title.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Meta Keyword</Label>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="Enter meta keyword"
                      disabled={isPending}
                      {...register("meta_keyword")}
                    />
                    {errors.meta_keyword && (
                      <div className=" text-destructive">
                        {errors.meta_keyword.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Meta Description</Label>
                    <Textarea
                      placeholder="Enter meta description"
                      rows={4}
                      disabled={isPending}
                      {...register("meta_description")}
                    />
                    {errors.meta_description && (
                      <div className=" text-destructive">
                        {errors.meta_description.message}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
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

export default CreateUpdateCategoryModal;

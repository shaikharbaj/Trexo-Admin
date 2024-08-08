import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FetchCountryForDropdown } from "@/service/country.service";

interface IModalProps {}

const CreateUpdateStateModal: React.FC<IModalProps> = () => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [options, setOptions] = useState<any[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
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
      handleFetchCountryForDropDown();
      setValue("state_name", data?.state_name);
      setValue("country_uuid", data?.country?.uuid);
      setValue("short_code", data?.short_code);
    }
  }, [data]);

  useEffect(() => {
    // handleFetchCountryForDropDown();
  }, []);

  // Function to fetch country for dropdown
  const handleFetchCountryForDropDown = async () => {
    try {
      const response = await FetchCountryForDropdown();
      setOptions(response.data);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  console.log(errors);
  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;
        console.log(payload);
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

  //Function to close the model
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
              <ScrollArea className="h-full">
                <div className="space-y-5 mb-2">
                  <div className="flex flex-col gap-2">
                    <Label>Country</Label>
                    <Controller
                      control={control}
                      name="country_uuid"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select State"
                              className="whitespace-nowrap"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {options?.map((country: any) => {
                              return (
                                <SelectItem
                                  value={country?.uuid}
                                  key={country?.country_uuid}
                                >
                                  {country?.country_name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.country_uuid && (
                      <div className=" text-destructive">
                        {errors.country_uuid.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>State Name</Label>
                    <Input
                      disabled={isPending}
                      type="text"
                      size="lg"
                      placeholder="Enter state name"
                      {...register("state_name")}
                    />
                    {errors.state_name && (
                      <div className=" text-destructive">
                        {errors.state_name.message}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Short Code</Label>
                    <Input
                      disabled={isPending}
                      type="text"
                      size="lg"
                      placeholder="Enter short code"
                      {...register("short_code")}
                    />
                    {errors.short_code && (
                      <div className=" text-destructive">
                        {errors.short_code.message}
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

export default CreateUpdateStateModal;

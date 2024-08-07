import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FetchCountryForDropdown } from "@/service/country.service";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IFormProps {
  isPending: boolean;
  register?: any;
  errors?: any;
}

const StateForm: React.FC<IFormProps> = ({ isPending, register, errors }) => {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    handleFetchCountryForDropDown();
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
  return (
    <>
      <ScrollArea className="h-full">
        <div className=" space-y-3">
          <div className="flex flex-col gap-2">
            <Label>Country Name</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select"
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
    </>
  );
};

export default StateForm;

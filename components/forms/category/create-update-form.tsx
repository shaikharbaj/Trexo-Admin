import React, {useState, useEffect} from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchIndustryDropdown } from "@/service/industry.service";
import toast from "react-hot-toast";

interface IFormProps {
  isPending: boolean;
  register?: any;
  control?: any;
  errors?: any;
}

interface Industry {
  uuid: string;
  industry_name: string;
}

const CategoryForm: React.FC<IFormProps> = ({
  isPending,
  register,
  control,
  errors,
}) => {
  const  [industries, setIndustries] = useState<Industry[]>([]);
  useEffect(() => {
    fetchIndustry();
  },[]);

  //Function to fetch industries
  const fetchIndustry = async () => {
    try {
      const response = await fetchIndustryDropdown();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setIndustries(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>
            Industry <span className=" text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="industry_id"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select onValueChange={onChange} value={(value) ? value : undefined}>
                <SelectTrigger color={errors?.industry_id && "destructive"}>
                  <SelectValue placeholder="Select Industry" className="whitespace-nowrap" />
                </SelectTrigger>
                <SelectContent>
                  {
                    industries.map((industry: any, industryIndex: number) => {
                      return(
                        <SelectItem key={industryIndex} value={industry.uuid}>{industry.industry_name}</SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry_id && (
            <div className=" text-destructive">
              {errors.industry_id.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Category Type <span className=" text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="category_type"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select onValueChange={onChange} value={(value) ? value : undefined}>
                <SelectTrigger color={errors?.category_type && "destructive"}>
                  <SelectValue placeholder="Select Category Type" className="whitespace-nowrap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUCT">Product</SelectItem>
                  <SelectItem value="SERVICE">Service</SelectItem>
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
          <Label>
            Category Name <span className=" text-destructive">*</span>
          </Label>
          <Input
            type="text"
            size="lg"
            placeholder="Enter category name"
            disabled={isPending}
            {...register("category_name")}
            className={cn("", {
              "border-destructive": errors?.category_name,
            })}
          />
          {errors.category_name && (
            <div className=" text-destructive">
              {errors.category_name.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Category Description <span className=" text-destructive">*</span>
          </Label>
          <Textarea
            placeholder="Enter category description"
            rows={4}
            disabled={isPending}
            {...register("category_description")}
            className={cn("", {
              "border-destructive": errors?.category_description,
            })}
          />
          {errors.category_description && (
            <div className=" text-destructive">
              {errors.category_description.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Meta Title <span className=" text-destructive">*</span>
          </Label>
          <Input
            type="text"
            size="lg"
            placeholder="Enter meta title"
            disabled={isPending}
            {...register("meta_title")}
            className={cn("", {
              "border-destructive": errors?.meta_title,
            })}
          />
          {errors.meta_title && (
            <div className=" text-destructive">{errors.meta_title.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Meta Keyword <span className=" text-destructive">*</span>
          </Label>
          <Input
            type="text"
            size="lg"
            placeholder="Enter meta keyword"
            disabled={isPending}
            {...register("meta_keyword")}
            className={cn("", {
              "border-destructive": errors?.meta_keyword,
            })}
          />
          {errors.meta_keyword && (
            <div className=" text-destructive">
              {errors.meta_keyword.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Meta Description <span className=" text-destructive">*</span>
          </Label>
          <Textarea
            placeholder="Enter meta description"
            rows={4}
            disabled={isPending}
            {...register("meta_description")}
            className={cn("", {
              "border-destructive": errors?.meta_description,
            })}
          />
          {errors.meta_description && (
            <div className=" text-destructive">
              {errors.meta_description.message}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default CategoryForm;

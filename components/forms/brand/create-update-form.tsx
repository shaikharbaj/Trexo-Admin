import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { default as MultiSelect } from "react-select";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { fetchCategoryDropdown } from "@/service/category.service";
import toast from "react-hot-toast";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  errors?: any;
  control?: any;
}
interface ICategory {
  id: number;
  uuid: string;
  category_name: string;
}
const BrandForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  errors,
  control,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    fetchCategory();
  }, []);

  //Function to fetch categories
  const fetchCategory = async () => {
    try {
      const response = await fetchCategoryDropdown();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setCategories(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  console.log(categories);

  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Category")} <span className=" text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="category_ids"
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                className={`${
                  errors?.category_ids ? "border-red-500" : "border-gray-300"
                }`}
                isMulti
                options={categories.map((category) => ({
                  label: category.category_name,
                  value: category.uuid,
                }))}
                value={categories
                  .filter((category) => value?.includes(category.uuid))
                  .map((category) => ({
                    label: category.category_name,
                    value: category.uuid,
                  }))}
                onChange={(selected) =>
                  onChange(selected ? selected.map((item) => item.value) : [])
                }
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors?.category_ids
                      ? "#EF4444"
                      : baseStyles.borderColor,
                    "&:hover": {
                      borderColor: errors?.category_ids
                        ? "#EF4444"
                        : baseStyles.borderColor,
                    },
                  }),
                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    color: errors?.category_ids ? "#EF4444" : baseStyles.color,
                  }),
                }}
                placeholder={trans("Select categories")}
              />
            )}
          />
          {errors.category_ids && (
            <div className=" text-destructive">
              {trans(errors.category_ids.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Brand Name")} <span className="text-destructive">*</span>
          </Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter brand name")}
            {...register("brand_name")}
          />
          {errors.brand_name && (
            <div className=" text-destructive">
              {trans(errors.brand_name.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Brand Description")}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            placeholder={trans("Enter brand description")}
            rows={4}
            disabled={isPending}
            {...register("brand_description")}
            className={cn("", {
              "border-destructive": errors?.brand_description,
            })}
          />
          {errors.brand_description && (
            <div className=" text-destructive">
              {trans(errors.brand_description.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>{trans("Meta Title")}</Label>
          <Input
            type="text"
            size="lg"
            placeholder={trans("Enter meta title")}
            disabled={isPending}
            {...register("meta_title")}
            className={cn("", {
              "border-destructive": errors?.meta_title,
            })}
          />
          {errors.meta_title && (
            <div className=" text-destructive">
              {trans(errors.meta_title.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>{trans("Meta Keyword")}</Label>
          <Input
            type="text"
            size="lg"
            placeholder={trans("Enter meta keyword")}
            disabled={isPending}
            {...register("meta_keywords")}
            className={cn("", {
              "border-destructive": errors?.meta_keywords,
            })}
          />
          {errors.meta_keywords && (
            <div className=" text-destructive">
              {trans(errors.meta_keywords.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>{trans("Meta Description")}</Label>
          <Textarea
            placeholder={trans("Enter meta description")}
            rows={4}
            disabled={isPending}
            {...register("meta_description")}
            className={cn("", {
              "border-destructive": errors?.meta_description,
            })}
          />
          {errors.meta_description && (
            <div className=" text-destructive">
              {trans(errors.meta_description.message)}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default BrandForm;

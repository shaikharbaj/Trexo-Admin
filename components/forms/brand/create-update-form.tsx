import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  errors?: any;
}

const BrandForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  errors,
}) => {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>{trans('Brand Name')} <span className="text-destructive">*</span></Label>
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
          <Label>{trans('Brand Description')} <span className="text-destructive">*</span></Label>
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
          <Label>
            {trans('Meta Title')}
          </Label>
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
            <div className=" text-destructive">{trans(errors.meta_title.message)}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans('Meta Keyword')}
          </Label>
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
          <Label>
            {trans('Meta Description')}
          </Label>
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

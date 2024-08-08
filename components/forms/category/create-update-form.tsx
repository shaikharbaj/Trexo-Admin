import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IFormProps {
  isPending: boolean;
  register?: any;
  control?: any;
  errors?: any;
}

const CategoryForm: React.FC<IFormProps> = ({
  isPending,
  register,
  control,
  errors,
}) => {
  return (
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
  );
};

export default CategoryForm;

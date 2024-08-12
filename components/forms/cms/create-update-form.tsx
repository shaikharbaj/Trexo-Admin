import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuillEditor from "@/components/ui/text-editor";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  watch?: any;
  setValue?: any;
  trigger?: any;
  control?: any;
  errors?: any;
}

const CmsForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  watch,
  setValue,
  trigger,
  control,
  errors,
}) => {
  const title = watch("title");
  useEffect(() => {
    generateCmsSlug(title);
  }, [title]);

  const generateCmsSlug = (title: string) => {
    let slug = title
      .toString() // Convert to string
      .toLowerCase() // Convert to lowercase
      .trim() // Trim whitespace from both ends
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
      .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, "") // Remove leading hyphens
      .replace(/-+$/, ""); // Remove trailing hyphens
    setValue("slug", slug);
    if (title) {
      trigger("slug");
    }
  };
  return (
    <>
      <ScrollArea className="h-full">
        <div className=" space-y-3">
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Title")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter title")}
              {...register("title")}
              className={cn("", {
                "border-destructive": errors.title,
              })}
            />
            {errors.title && (
              <div className=" text-destructive">
                {trans(errors.title.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Slug")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter slug")}
              {...register("slug")}
              className={cn("", {
                "border-destructive": errors.slug,
              })}
            />
            {errors.slug && (
              <div className=" text-destructive">
                {trans(errors.slug.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Content")}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <QuillEditor
                  value={value}
                  onChange={onChange}
                  className={cn("border", {
                    "border-destructive": errors.content,
                  })}
                />
              )}
            />
            {errors.content && (
              <div className=" text-destructive">
                {trans(errors.content.message)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default CmsForm;

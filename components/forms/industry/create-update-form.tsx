import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface IFormProps {
  isPending: boolean;
  register?: any;
  errors?: any;
}

const IndustryForm: React.FC<IFormProps> = ({
  isPending,
  register,
  errors,
}) => {
  return (
    <div className=" space-y-3">
      <div className="flex flex-col gap-2">
        <Label>Industry Name</Label>
        <Input
          disabled={isPending}
          type="text"
          size="lg"
          placeholder="Enter industry name"
          {...register("industry_name")}
        />
        {errors.industry_name && (
          <div className=" text-destructive">
            {errors.industry_name.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryForm;

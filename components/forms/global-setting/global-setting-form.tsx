import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CurrencySelect from "../currency-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { globalSettingSchema } from "@/validations";
import { createGlobalSetting } from "@/service/global-setting.service";

interface IGlobalSettingFormProps { }

const GlobalSettingForm: React.FunctionComponent<
  IGlobalSettingFormProps
> = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(globalSettingSchema),
    mode: "all",
    defaultValues: {
      site_name: "",
      site_email: "",
      phone: "",
      meta_title: "",
      meta_keyword: "",
      meta_description: "",
      otp_explore_time: "",
      revenue_percentage: "",
      currency_symbol: "",
      time_zone: "",
      address: "",
      footer_content: "",
    },
  });

  //Function to handel form submit
  const onSubmit = (data: any) => {
    data.otp_explore_time = parseInt(data.otp_explore_time);
    data.revenue_percentage = parseInt(data.revenue_percentage);
    console.log(data)
    startTransition(async () => {
      startTransition(async () => {
        try {
          const response: any = await createGlobalSetting(data);
          if (response?.status === true && response?.statusCode === 200) {
            toast.success(response?.message);
          } else {
            toast.error(response?.message);
          }
        } catch (error: any) {
          toast.error(error?.message);
        }
      })
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6 mt-6">
        <div>
          <Label
            htmlFor="site_name"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Site Name:
          </Label>
          <Input
            disabled={isPending}
            {...register("site_name")}
            type="text"
            id="site_name"
            placeholder="TrexoPro"
            className={cn("", {
              "border-destructive": errors.site_name,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.site_name && (
            <div className=" text-destructive mt-2">
              {errors?.site_name?.message}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="site_email"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Site Email:
          </Label>
          <Input
            disabled={isPending}
            {...register("site_email")}
            type="email"
            id="site_email"
            placeholder="spatel1katalysttech.com"
            className={cn("", {
              "border-destructive": errors.site_email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.site_email && (
            <div className=" text-destructive mt-2">
              {errors?.site_email?.message}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Phone:
          </Label>
          <Input
            disabled={isPending}
            {...register("phone")}
            type="text"
            id="phone"
            placeholder="8806886201"
            className={cn("", {
              "border-destructive": errors.phone,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.phone && (
            <div className=" text-destructive mt-2">
              {errors?.phone?.message}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="meta_title"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Meta title:
          </Label>
          <Input
            disabled={isPending}
            {...register("meta_title")}
            type="text"
            id="meta_title"
            placeholder="trexopro"
            className={cn("", {
              "border-destructive": errors.meta_title,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.meta_title && (
            <div className=" text-destructive mt-2">
              {errors?.meta_title?.message}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="meta_keyword"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Meta keyword:
          </Label>
          <Input
            disabled={isPending}
            {...register("meta_keyword")}
            type="text"
            id="meta_keyword"
            placeholder="ecommerce"
            className={cn("", {
              "border-destructive": errors.meta_keyword,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.meta_keyword && (
            <div className=" text-destructive mt-2">
              {errors?.meta_keyword?.message}
            </div>
          )}
        </div>


        <div>
          <Label
            htmlFor="otp_expiration_time"
            className="text-sm font-medium text-default-600 mb-1"
          >
            OTP Explore Time (In Minutes):
          </Label>
          <Input
            disabled={isPending}
            {...register("otp_explore_time")}
            type="text"
            id="otp_expiration_time"
            placeholder="3"
            className={cn("", {
              "border-destructive": errors.otp_explore_time,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.otp_explore_time && (
            <div className=" text-destructive mt-2">
              {errors?.otp_explore_time?.message}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="revenue_percentage"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Revenue Percentage:
          </Label>
          <Input
            disabled={isPending}
            {...register("revenue_percentage")}
            type="text"
            id="revenue_percentage"
            placeholder="75"
            className={cn("", {
              "border-destructive": errors.revenue_percentage,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.revenue_percentage && (
            <div className=" text-destructive mt-2">
              {errors?.revenue_percentage?.message}
            </div>
          )}
        </div>

        <div>
          <Label
            htmlFor="currency_symbol"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Currency Symbol:
          </Label>
          <CurrencySelect register={register} />
          {errors?.currency_symbol && (
            <div className=" text-destructive mt-2">
              {errors?.currency_symbol?.message}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="timezone"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Time Zone:
          </Label>
          <Select {...register("time_zone")}>
            <SelectTrigger>
              <SelectValue placeholder="Select One" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">UCT</SelectItem>
              <SelectItem value="2">IST</SelectItem>
              <SelectItem value="3">BST</SelectItem>
              <SelectItem value="4">CST</SelectItem>
            </SelectContent>
          </Select>
          {errors?.time_zone && (
            <div className=" text-destructive mt-2">
              {errors?.time_zone?.message}
            </div>
          )}
        </div>

      </div>
      <div className=" mt-3 lg:mt-6">
        <Label
          htmlFor="address"
          className="text-sm font-medium text-default-600 mb-1"
        >
          Address:
        </Label>
        <Textarea
          {...register("address")}
          id="address"
          className="rounded h-10"
          placeholder="Add Address"
        />
        {errors?.address && (
          <div className=" text-destructive mt-2">
            {errors?.address?.message}
          </div>
        )}
      </div>
      <div className=" mt-3 lg:mt-6">
        <Label
          htmlFor="meta description"
          className="text-sm font-medium text-default-600 mb-1"
        >
          Meta Description:
        </Label>
        <Textarea
          {...register("meta_description")}
          id="meta_description"
          className="rounded h-10"
          placeholder="Add Footer Content"
        />
        {errors?.meta_description && (
          <div className=" text-destructive mt-2">
            {errors?.meta_description?.message}
          </div>
        )}
      </div>
      <div className=" mt-3 lg:mt-6">
        <Label
          htmlFor="footer content"
          className="text-sm font-medium text-default-600 mb-1"
        >
          Footer Content:
        </Label>
        <Textarea
          {...register("footer_content")}
          id="footer_content"
          className="rounded h-10"
          placeholder="Add Footer Content"
        />
        {errors?.footer_content && (
          <div className=" text-destructive mt-2">
            {errors?.footer_content?.message}
          </div>
        )}
      </div>

      <div className="flex-none flex items-center justify-end gap-4 mt-8">
        <Button variant="outline" className=" text-default-300">
          <Icon icon="heroicons:x-mark" className="w-5 h-5 ltr:mr-2 rtl:ml-2" />{" "}
          Cancel{" "}
        </Button>
        <Button>
          <Icon icon="heroicons:check" className="w-5 h-5 ltr:mr-2 rtl:ml-2" />{" "}
          Save
        </Button>
      </div>
    </form>
  );
};

export default GlobalSettingForm;

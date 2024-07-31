import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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

interface IGlobalSettingFormProps {}

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
    //resolver: zodResolver({}),
    mode: "all",
    defaultValues: {
      site_title: "",
      site_email: "",
      invoice_email: "",
      phone: "",
      otp_expiration_time: "",
      revenue_percentage: "",
      cgst: "",
      sgst: "",
      currency_symbol: "",
      local_time_zone: "",
      email_enabled: "",
      address: "",
    },
  });

  //Function to handel form submit
  const onSubmit = (data: any) => {
    startTransition(async () => {
      console.log("data ", data);
      toast.success("Login Successful");
      // let response = await signIn("credentials", {
      //   email: data.email,
      //   password: data.password,
      //   redirect: false,
      // });
      // console.log('response ', response);
      // if (response?.ok) {
      //   toast.success("Login Successful");
      //   window.location.assign("/dashboard");
      //   reset();
      // } else if (response?.error) {
      //   toast.error(response?.error);
      // }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6 mt-6">
        <div>
          <Label
            htmlFor="site_title"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Site Title:
          </Label>
          <Input
            disabled={isPending}
            {...register("site_title")}
            type="text"
            id="site_title"
            placeholder="TrexoPro"
            className={cn("", {
              "border-destructive": errors.site_title,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.site_title && (
            <div className=" text-destructive mt-2">
              {errors?.site_title?.message}
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
            htmlFor="invoice_email"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Invoice Email:
          </Label>
          <Input
            disabled={isPending}
            {...register("invoice_email")}
            type="email"
            id="invoice_email"
            placeholder="spatel1katalysttech.com"
            className={cn("", {
              "border-destructive": errors.invoice_email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.invoice_email && (
            <div className=" text-destructive mt-2">
              {errors?.invoice_email?.message}
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
            htmlFor="otp_expiration_time"
            className="text-sm font-medium text-default-600 mb-1"
          >
            OTP Explore Time (In Minutes):
          </Label>
          <Input
            disabled={isPending}
            {...register("otp_expiration_time")}
            type="text"
            id="otp_expiration_time"
            placeholder="3"
            className={cn("", {
              "border-destructive": errors.otp_expiration_time,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.otp_expiration_time && (
            <div className=" text-destructive mt-2">
              {errors?.otp_expiration_time?.message}
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
            htmlFor="cgst"
            className="text-sm font-medium text-default-600 mb-1"
          >
            CGST:
          </Label>
          <Input
            disabled={isPending}
            {...register("cgst")}
            type="text"
            id="cgst"
            placeholder="9"
            className={cn("", {
              "border-destructive": errors.cgst,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.cgst && (
            <div className=" text-destructive mt-2">
              {errors?.cgst?.message}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="sgst"
            className="text-sm font-medium text-default-600 mb-1"
          >
            SGST:
          </Label>
          <Input
            disabled={isPending}
            {...register("sgst")}
            type="text"
            id="sgst"
            placeholder="9"
            className={cn("", {
              "border-destructive": errors.sgst,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.sgst && (
            <div className=" text-destructive mt-2">
              {errors?.sgst?.message}
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
          <CurrencySelect />
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
            Local Time Zone:
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select One" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            htmlFor="enabled"
            className="text-sm font-medium text-default-600 mb-1"
          >
            Email Enabled:
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select One" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
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
          id="address"
          className="rounded h-10"
          placeholder="Add Address"
        />
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

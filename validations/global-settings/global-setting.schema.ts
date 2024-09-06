import { z } from "zod";

const globalSettingSchema = z.object({
    site_name: z.string()
        .min(1, { message: "Please enter site name" }),
    site_email: z.string().email({ message: "Please enter site email address" }),
    phone: z.string()
        .min(1, { message: "Please enter Phone Number" })
        .regex(/^\d+$/, {
            message: "Phone must contain only numbers",
        })
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(14, { message: "Phone number must be at most 14 digits" }),
    otp_explore_time: z.coerce.string()
        .min(1, { message: "Please enter OTP explore time" })
        .refine(value => parseFloat(value) > 0, { message: "OTP explore time should be greater than 0" })
        .refine(value => /^[0-9]+$/.test(value.toString()), { message: "OTP explore time should only contain number" }),
    revenue_percentage: z.coerce.string()
        .min(1, { message: "Please enter revenue percentage" })
        .refine(value => /^[0-9]+(\.[0-9]*)?$/.test(value.toString()), {
            message: "Revenue percentage should only contain number"
        })
        .refine(value => parseFloat(value) > 0, { message: "Revenue percentage should be greater than 0" })
        .refine(value => parseFloat(value) <= 100, { message: "Revenue percentage should not be more than 100" }),
    currency_symbol: z.string().min(1, { message: "Please select currency symbol" }),
    time_zone: z.string().min(1, { message: "Please select time zone" }),
    footer_content: z.string().min(1, { message: "Please enter footer content" }),
    address: z.string().optional(),
    meta_title: z.string().optional(),
    meta_keyword: z.string().optional(),
    meta_description: z.string().optional(),
});

export default globalSettingSchema;

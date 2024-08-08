import { z } from "zod";

const globalSettingSchema = z.object({
    site_name: z.string().min(1, { message: "Site name cannot be empty." }),
    site_email: z.string().email({ message: "Invalid site email address." }),
    phone: z.string().min(1, { message: "Phone cannot be empty." }),
    meta_title: z.string().min(1, { message: "Meta title cannot be empty." }),
    meta_keyword: z.string().min(1, { message: "Meta keyword cannot be empty." }),
    meta_description: z.string().min(1, { message: "Meta description cannot be empty." }),
    otp_explore_time: z.string()
        .regex(/^\d+$/, { message: "OTP explore time must be a number" })
        .min(1, { message: "OTP explore time cannot be empty." }),
    revenue_percentage: z.string()
        .regex(/^\d+$/, { message: "OTP explore time must be a number" })
        .min(1, { message: "Revenue percentage cannot be empty." }),
    currency_symbol: z.string().min(1, { message: "Currency symbol cannot be empty." }),
    time_zone: z.string().min(1, { message: "Time zone cannot be empty." }),
    address: z.string().min(1, { message: "Address cannot be empty." }),
    footer_content: z.string().min(1, { message: "Footer content can be empty." }),
});

export default globalSettingSchema;

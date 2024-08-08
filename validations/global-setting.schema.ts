import { z } from "zod";

const globalSettingSchema = z.object({
    site_name: z.string().min(1, { message: "Please enter site name." }),
    site_email: z.string().email({ message: "Please enter site email address." }),
    phone: z.string().min(1, { message: "Please enter Phone Number." }),
    otp_explore_time: z.coerce.number()
        .int()
        .positive({ message: "Please enter positive number." })
        .min(1, { message: "Please enter OTP explore time." }),
    revenue_percentage: z.coerce.number()
        .int()
        .positive({ message: "Please enter positive number." })
        .min(1, { message: "Please enter revenue percentage." }),
    currency_symbol: z.string().min(1, { message: "Please select currency symbol." }),
    time_zone: z.string().min(1, { message: "Please select time zone." }),
    footer_content: z.string().min(1, { message: "Footer content can be empty." }),
    address: z.string().optional(),
    meta_title: z.string().optional(),
    meta_keyword: z.string().optional(),
    meta_description: z.string().optional(),
});

export default globalSettingSchema;

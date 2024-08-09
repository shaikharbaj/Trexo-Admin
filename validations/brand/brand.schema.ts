import { z } from "zod";

const brandSchema = z.object({
    brand_name: z.string().min(1, { message: "Please enter brand name" }),
    brand_description: z.string()
        .min(1, { message: "Please enter brand description" })
        .max(100, { message: "Brand description must be less than 100 characters" }),
    meta_title: z.string()
        .optional(),
    meta_keywords: z.string()
        .optional(),
    meta_description: z.string()
        .max(100, { message: "Meta description must be less than 100 characters" })
        .optional(),
});

export default brandSchema;

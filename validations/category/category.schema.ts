import { z } from "zod";

const categorySchema = z.object({
    industry_id: z.string().min(1, { message: "Please select industry." }),
    category_type: z.string().min(1, { message: "Please select category type." }),
    category_name: z.string().min(1, { message: "Please enter category name." }),
    category_description: z.string().min(1, { message: "Please enter category description." }).max(100, {message: "Category description must be less than 100 characters"}),
    meta_title: z.string().min(1, { message: "Please enter meta title." }),
    meta_keyword: z.string().min(1, { message: "Please enter meta keyword." }),
    meta_description: z.string().min(1, { message: "Please enter meta description." }).max(100, {message: "Meta description must be less than 100 characters"}),
});

export default categorySchema;

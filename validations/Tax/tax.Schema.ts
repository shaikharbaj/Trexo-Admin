import { z } from "zod";

const taxSchema = z.object({
  tax_name: z.string().min(1, { message: "Please enter tax name" }),
  description: z.string().min(1, { message: "Please enter tax description" }),
  tax_type: z.string().min(1, { message: "Please select tax type" }),
  value_type: z.string().min(1, { message: "Please select value type" }),
  tax_value: z.string().min(1, { message: "Please enter tax value" }).regex(/^\d+(\.\d{1,2})?$/, { message: "Tax value must be a valid number" })
  .transform((val) => parseFloat(val)),
});

export default taxSchema;

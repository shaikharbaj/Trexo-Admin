import { z } from "zod";

const stateSchema = z.object({
  state_name: z
    .string()
    .min(1, { message: "Please enter state name" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name must contain only alphabetic characters",
    }),
  short_code: z
    .string()
    .min(1, { message: "Please enter Short Code" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Short code must contain only alphabetic characters",
    })
});

export default stateSchema;

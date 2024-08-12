import { z } from "zod";

const isContentEmpty = (content: string) => {
  const strippedContent = content.replace(/<[^>]*>/g, "").trim();
  return strippedContent.length === 0;
};

const cmsSchema = z.object({
  title: z.string().min(1, { message: "Please enter title" }),
  content: z
    .string()
    .min(1, { message: "Please enter content" })
    .refine((value) => !isContentEmpty(value), {
      message: "Please enter content",
    }),
  slug: z
    .string()
    .min(1, { message: "Please enter slug" })
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, { message: "Please enter valid slug" }),
});

export default cmsSchema;

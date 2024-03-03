import { z } from "zod";

export const resumeSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.object({
    city: z.string(),
    state: z.string(),
  }),
});

import { z } from "zod";

export const resumeSchema = z.object({
  names: z.object({
    firstName: z.string().min(1, { message: "Name is required" }),
    lastName: z.string().min(1, { message: "Name is required" }),
  }),

  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10).max(30),
  address: z.object({
    city: z.string(),
    state: z.string(),
  }),
});

import { z } from "zod";

export const formSchema = z.object({
  companyName: z.string({ required_error: "Company name is required" }),
  title: z.string({
    required_error: "Job title is required",
  }),
  description: z.string(),
  startDate:
    z.date({
      required_error: "To get the timeline, start date is required",
    }) ||
    z
      .string({ required_error: "To get the timeline, start date is required" })
      .optional(),
  endDate: z.date({}).optional() || z.string({}).optional(),
  currentlyWorking: z.boolean().default(false).optional(),
});

export const employmentSchema = z.object({
  experience: z.array(formSchema),
});

export type FormSchema = z.infer<typeof formSchema>;
export type EmploymentSchema = z.infer<typeof employmentSchema>;

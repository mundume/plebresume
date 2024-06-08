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
  location: z.string({ required_error: "Location is required" }),
});

export const employmentSchema = z.object({
  experience: z.array(formSchema),
});

export const educationFormSchema = z.object({
  schoolName: z.string({ required_error: "School name is required" }),
  degree: z.string({ required_error: "Degree is required" }),
  startDate: z
    .string({ required_error: "To get the timeline, start date is required" })
    .optional(),
  endDate: z
    .string({ required_error: "To get the timeline, end date is required" })
    .optional(),
  currentlyStudying: z.boolean().default(false).optional(),
  location: z.string({ required_error: "Location is required" }),
});

export type FormSchema = z.infer<typeof formSchema>;
export type EmploymentSchema = z.infer<typeof employmentSchema>;

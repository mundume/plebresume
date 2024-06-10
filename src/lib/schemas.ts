import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ required_error: "Company name is required" }),
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
  currently: z.boolean().default(false).optional(),
  location: z.string({ required_error: "Location is required" }),
});
export const educationFormSchema = z.object({
  name: z.string({ required_error: "Company name is required" }),
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
  currently: z.boolean().default(false).optional(),
  location: z.string({ required_error: "Location is required" }),
});

export const employmentSchema = z.object({
  experience: z.array(formSchema),
});

export const educationSchema = z.object({
  education: z.array(educationFormSchema),
});

export type EducationFormSchema = z.infer<typeof educationFormSchema>;
export type EducationSchema = z.infer<typeof educationSchema>;

export type FormSchema = z.infer<typeof formSchema>;
export type EmploymentSchema = z.infer<typeof employmentSchema>;

import { z } from "zod";

export const resumeSchema = z.object({
  names: z.object({
    firstName: z.string().min(1, { message: "Name is required" }),
    lastName: z.string().min(1, { message: "Name is required" }),
  }),

  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10).max(30),
  profile: z.string().min(10).max(1000),
  address: z.object({
    city: z.string(),
    state: z.string(),
  }),
});

export const workExperience = z.object({
  companyName: z.string().min(1, { message: "Name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export type PersonalInfomationValues = z.infer<typeof resumeSchema>;
export type WorkExperienceValues = z.infer<typeof workExperience>;

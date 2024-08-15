import { z } from "zod";

export const resumeSchema = z.object({
  resume: z.object({
    names: z
      .object({
        firstName: z.string().min(1, { message: "Name is required" }),
        lastName: z.string().min(1, { message: "Name is required" }),
      })
      .optional(),

    email: z
      .string()
      .email({ message: "Please enter a valid email" })
      .optional(),
    phone: z.string().min(10).max(30).optional(),
    profile: z.string().min(10).max(1000).optional(),
    proffession: z.string().optional(),
    address: z
      .object({
        city: z.string(),
        state: z.string(),
      })
      .optional(),
  }),
});

export const workExperience = z.object({
  companyName: z.string().min(1, { message: "Name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

// companyName?: string;
//   description?: string;
//   endDate?: string;
//   startDate?: string;
//   title?: string;
const schema = z.object({
  notifications: z
    .array(
      z.object({
        name: z.string().describe("Name of a fictional person."),
        message: z.string().describe("Do not use emojis or links."),
        minutesAgo: z.number(),
      })
    )
    .optional(),
});

export type PersonalInfomationValues = z.infer<typeof resumeSchema>;
export type WorkExperienceValues = z.infer<typeof workExperience>;
export type NotificationSchema = z.infer<typeof schema>;

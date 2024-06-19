import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ required_error: "Company name is required" }),
  title: z.string({
    required_error: "Job title is required",
  }),
  description: z.string(),
  startDate:
    z
      .date({
        required_error: "To get the timeline, start date is required",
      })
      .optional() ||
    z
      .string({ required_error: "To get the timeline, start date is required" })
      .optional(),
  endDate: z.date({}).optional() || z.string({}).optional(),
  currently: z.boolean().default(false).optional(),
  location: z.string({ required_error: "Location is required" }),
});
export const educationFormSchema = z.object({
  name: z.string({ required_error: "School name is required" }),
  title: z.string({
    required_error: "School degree is required",
  }),
  description: z.string().optional(),
  startDate:
    z
      .date({
        required_error: "To get the timeline, start date is required",
      })
      .optional() ||
    z
      .string({ required_error: "To get the timeline, start date is required" })
      .optional(),
  endDate: z.date({}).optional() || z.string({}).optional(),
  currently: z.boolean().default(false).optional(),
  location: z.string({ required_error: "Location is required" }).optional(),
});

export const employmentSchema = z.object({
  experience: z.array(formSchema),
});

export const educationSchema = z.object({
  education: z.array(educationFormSchema),
});

export const socialLinks = z.object({
  name: z.string(),
  link: z.string(),
});

export const socialLinksSchema = z.object({
  socialLinks: z.array(socialLinks),
});

export const skillsSchema = z.object({
  skills: z.string(),
});

export const skillsFormSchema = z.object({
  skills: z.array(skillsSchema),
});

export type SkillsFormSchema = z.infer<typeof skillsFormSchema>;
export type SkillsSchema = z.infer<typeof skillsSchema>;

export type SocialLinksSchema = z.infer<typeof socialLinksSchema>;

export type EducationFormSchema = z.infer<typeof educationFormSchema>;
export type EducationSchema = z.infer<typeof educationSchema>;

export type FormSchema = z.infer<typeof formSchema>;
export type EmploymentSchema = z.infer<typeof employmentSchema>;

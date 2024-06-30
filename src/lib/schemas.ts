import { z, ZodSchema } from "zod";

export const formSchema = z.object({
  name: z.string({ required_error: "Company name is required" }).optional(),
  title: z
    .string({
      required_error: "Job title is required",
    })
    .optional(),
  description: z.string().optional(),
  startDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional()
  ),
  endDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional()
  ),
  currently: z.boolean().default(false).optional(),
  location: z.string({ required_error: "Location is required" }),
});

export const employmentSchema = z.object({
  experience: z.array(formSchema),
});

export const educationSchema = z.object({
  education: z.array(formSchema),
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
  level: z.string(),
});

export const skillsFormSchema = z.object({
  skills: z.array(skillsSchema),
});

export const HobbiesSchema = z.object({
  hobbies: z.string(),
});
export const LanguagesSchema = z.object({
  languages: z.string(),
  level: z.string(),
});
export const LanguagesFormSchema = z.object({
  languages: z.array(LanguagesSchema),
});

export type LanguagesFormSchema = z.infer<typeof LanguagesFormSchema>;
export type HobbiesFormSchema = z.infer<typeof HobbiesSchema>;

export type SkillsFormSchema = z.infer<typeof skillsFormSchema>;
export type SkillsSchema = z.infer<typeof skillsSchema>;

export type SocialLinksSchema = z.infer<typeof socialLinksSchema>;

export type EducationFormSchema = z.infer<typeof educationSchema>;
export type EducationSchema = z.infer<typeof educationSchema>;

export type FormSchema = z.infer<typeof formSchema>;
export type EmploymentSchema = z.infer<typeof employmentSchema>;

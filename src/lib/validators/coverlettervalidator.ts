import { z } from "zod";

export const coverLetterSchema = z.object({
  fileId: z.string(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  // companyName: z.string(),
  // companyAddress: z.string(),
  // city: z.string(),
});

export const CoverLetterFormSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
  // companyName: z.string(),
  // companyAddress: z.string(),
  // city: z.string(),
});

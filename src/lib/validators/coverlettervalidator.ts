import { z } from "zod";

export const coverLetterSchema = z.object({
  fileId: z.string(),
  jobTitle: z.string(),
  jobDescription: z.string(),
});

export const CoverLetterFormSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
});



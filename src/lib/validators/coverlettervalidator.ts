import { z } from "zod";

export const coverLetterSchema = z.object({
  fileId: z.string(),
});

export const formSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
});

import { z } from "zod";

export const coverLetterSchema = z.object({
  fileId: z.string(),
});

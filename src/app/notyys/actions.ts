"use server";

import { generateObject, streamText } from "ai";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { coverLetterSchema } from "@/lib/validators/coverlettervalidator";
import { db } from "@/config/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { openai } from "@ai-sdk/openai";
import { pinecone } from "@/lib/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { createStreamableValue } from "ai/rsc";

export async function getNotifications(input: string) {
  "use server";

  const { object: profiles } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    system:
      "You are a helpful assistant used to generate 5 resume profiles from user input.",
    prompt: input,
    schema: z.object({
      profiles: z.array(
        z.object({
          profile: z.string(),
        })
      ),
    }),
  });
  revalidatePath("/resume/[resumeId]", "page");
  return { profiles };
}

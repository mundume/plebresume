"use server";
import { generateObject } from "ai";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { openai } from "@ai-sdk/openai";

export async function generateResumeProfile({
  skills,
}: {
  skills?: {
    skills: string;
    level: string;
  }[];
}) {
  const { object: profiles } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    system:
      "You are a helpful assistant used to generate 5 resume profiles from user input.",
    schema: z.object({
      profiles: z.array(
        z.object({
          profile: z.string(),
        })
      ),
    }),
    messages: [
      {
        role: "system",
        content: `Generate 5 resume profiles from user input. Use the following skills: ${skills?.map(
          (skill) => skill.skills
        )}.`,
      },

      {
        role: "user",
        content: `Generate 5 resume profiles from user input. Use the following skills: ${skills?.map(
          (skill) => skill.skills
        )}.`,
      },
    ],
  });
  revalidatePath("/resume/[resumeId]", "page");
  return { profiles };
}

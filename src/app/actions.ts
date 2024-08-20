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
    model: openai("gpt-4o-mini"),
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

export async function generateSkills({ input }: { input: string }) {
  const { object: skills } = await generateObject({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful assistant used to generate 5 skills from user input.",
    schema: z.object({
      skills: z.array(
        z.object({
          skill: z.string(),
        })
      ),
    }),
    messages: [
      {
        role: "system",
        content: `Generate 10  job related skills ie html, css, typescript, etc from the following job title provided as the input: ${input}`,
      },

      {
        role: "user",
        content: `Generate 10  job related skills ie html, css, typescript, etc from the following job title provided as the input: ${input}`,
      },
    ],
  });

  revalidatePath("/resume/[resumeId]", "page");

  return { skills };
}

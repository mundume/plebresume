import { openai } from "@ai-sdk/openai";

import { streamText, streamObject } from "ai";

import { generateObject } from "ai";
import { z } from "zod";

export const POST = async (req: Request) => {
  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo"),
    prompt: "Write a poem about embedding models.",
    toolChoice: "required",
    tools: {},
  });

  const { object } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      profile: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
    }),

    prompt: "generate 5 resume profile section templates",
  });
  console.log(await object.profile[0].title);

  return new Response(JSON.stringify({ object }));
};

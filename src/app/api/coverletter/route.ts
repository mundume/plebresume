import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { openai } from "@/lib/openai";
import { pinecone } from "@/lib/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { coverLetterSchema } from "@/lib/validators/coverlettervalidator";
import { db } from "@/config/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIStream, StreamingTextResponse } from "ai";
export const POST = async (req: NextRequest) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const id = user?.id;

  const body = await req.json();
  const { id: fileId } = coverLetterSchema.parse(body);

  if (!user || !user?.id)
    return new Response("Unauthorized", {
      status: 401,
    });

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: id,
    },
  });
  if (!file)
    return new Response("Not Found", {
      status: 404,
    });

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const pineconeIndex = pinecone.Index("plebresume");
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    filter: { fileId },
  });

  const results = await vectorStore.similaritySearch(fileId);
  console.log(results);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context (or previous conversaton if needed) to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context",
      },
      {
        role: "user",
        content: `Use the following pieces of context (or previous conversaton if needed) to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.

  \n----------------\n
  CONTEXT:
  ${results.map((r) => r.pageContent).join("\n\n")}
  `,
      },
    ],
  });

  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
};

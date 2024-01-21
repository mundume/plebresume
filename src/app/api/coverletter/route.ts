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
  const { fileId } = coverLetterSchema.parse(body);

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
    temperature: 0.6,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\nYou can use the cover letter sample as an example provided to generate the cover letter.\n You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images.",
      },
      {
        role: "user",
        content: `Use the following pieces of context  to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\n You can use the cover letter sample as an example provided to generate the cover letter.\n.You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images.


  \n----------------\n


  CONTEXT:
  ${results.map((result) => result.pageContent).join("\n\n")}

 \n----------------\n
 COVER LETTER SAMPLE:
Applicants Name
Address
City
Phone Number
Email Adress

Date

HR name
Company
Adress
City

Dear Hr Name,

I am writing to apply for the programmer position advertised in the Times Union. As requested, I enclose my certification, resume, and references.

The role is very appealing to me, and I believe that my strong technical experience and education make me a highly competitive candidate for this position. My key strengths that would support my success in this position include:

I have successfully designed, developed, and supported live-use applications.
I strive continually for excellence.
I provide exceptional contributions to customer service for all customers.
With a BS degree in computer programming, I have a comprehensive understanding of the full lifecycle of software development projects. I also have experience in learning and applying new technologies as appropriate. Please see my resume for additional information on my experience.

I can be reached anytime via email at [email] or by phone at [phone number].

Thank you for your time and consideration. I look forward to speaking with you about this employment opportunity.

Sincerely,

Signature (hard copy letter)

Applicants Name



  `,
      },
    ],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      console.log(completion);
      const pleb = await db.coverLetter.findFirst({
        where: {
          id: fileId,
        },
      });

      if (pleb) {
        console.log(pleb.text);
        await db.coverLetter.update({
          where: {
            id: fileId,
            userId: id,
          },
          data: {
            text: completion,
          },
        });
      }
      if (!pleb) {
        console.log("no pleb");
      }
      await db.coverLetter.create({
        data: {
          name: `${user.given_name} ${user.family_name}  coverletter ${fileId} `,
          text: completion,
          id: fileId,
          userId: id,
        },
      });
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
};

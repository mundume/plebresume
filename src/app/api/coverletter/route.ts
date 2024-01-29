import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { openai } from "@/lib/openai";
import { pinecone } from "@/lib/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { coverLetterSchema } from "@/lib/validators/coverlettervalidator";
import { db } from "@/config/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { format } from "date-fns";
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
    temperature: 0.4,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\nYou can use the cover letter sample as an example provided to generate the cover letter.\n You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images. \n You should return well indented markdown.\n You will be penalized if you return non well indented markdown..\nthe applicant name, email, and phone number each rendered in a new line",
      },
      {
        role: "user",
        content: `Use the following pieces of context  to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\n You can use the cover letter sample as an example provided to generate the cover letter and you always return the response in markdown or you will be penalized.\n.You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images.\n You should return well indented markdown.\n You will be penalized if you return non well indented markdown.\nthe applicant name, email, and phone number each rendered in a new line.


  \n----------------\n


  CONTEXT:
  ${results.map((result) => result.pageContent).join("\n\n")}

 \n----------------\n
 COVER LETTER SAMPLE:

---
title: Application for Auditor Position at Divoc Financials
---

# Kyla Williams
Philadelphia, PA  
Phone: 999-555-4578  
Email: kyla.williams@email.com

May 6, 2023

Dear Leslie Anderson,

I'm delighted to submit my application for the open position of Auditor with Divoc Financials. I have seven years of professional financial experience, including three years of experience in consulting and auditing with a focus on external and payroll audits. My experience and skills have helped me become a valuable member of my current financial team, and I look forward to entering the next phase of my career by joining your company.

I'm an accredited accountant and believe that my experiences align perfectly with the open position. I have most recently worked for Anderson, Phillips and Pollyson Inc., where I coordinate external and payroll audits for over 50 clients. My knowledge of tax law and state Pennsylvania state financial regulations also helps me give sound financial advice to clients. In previous roles, I have completed a wide range of auditing duties, including examining reports and financial records for inconsistencies, documenting my findings and preparing fraud reports. My skills include communication, critical thinking and financial software operation.

In my work, I value honesty, integrity, and compassion. These are the values with which I approach every client, and I see those same values in the Divoc mission statement. I look forward to working with a company that shares my attitude as a financial professional and to collaborating with the incredible peers I'm sure to meet. I believe working with Divoc Financials is an excellent opportunity for me to expand my practice to include publicly held companies and government organizations. Last summer, I completed a relevant auditing course and look forward to putting my new skills into practice.

Thank you for taking the time to review my application and consider me for the position of Auditor. I hope that this letter conveys my excitement and my qualifications for the role. If you'd like to discuss the matter further or learn more about me and my experiences, please don't hesitate to contact me by phone or by email.

Sincerely,  
Kyla Williams


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
          userId: id,
        },
      });
      if (pleb) {
        await db.coverLetter.update({
          where: {
            id: fileId,
            userId: id,
          },
          data: {
            text: completion,
          },
        });
      } else {
        await db.coverLetter.create({
          data: {
            name: `${user.given_name} ${user.family_name}  coverletter ${fileId} `,
            text: completion,
            id: fileId,
            userId: id,
          },
        });
      }
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
};

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { pinecone } from "@/lib/pinecone";
import { NextRequest } from "next/server";
import { coverLetterSchema } from "@/lib/validators/coverlettervalidator";
import { db } from "@/config/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
export const runtime = "edge";
export const POST = async (req: NextRequest) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const id = user?.id;

  const body = await req.json();
  const { fileId, jobTitle, jobDescription } = coverLetterSchema.parse(body);
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

  const response = await streamText({
    model: openai("gpt-3.5-turbo"),
    temperature: 0.7,

    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context to generate a cover letter for the user.\n \n You should use the Job Description and the context to get the details of the job but you should too be able to think like an applicant. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\nYou can use the cover letter sample as an example provided to generate the cover letter.\n You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images. \n You should return well indented markdown.\n You will be penalized if you return non well indented markdown..\nThe applicant name, email, and phone number should be rendered in a new line a new line.\nYou will be penalized if you dont render the name, email and phone number each in a new line.",
      },
      {
        role: "user",
        content: `Use the following pieces of context  to generate a cover letter for the user.\n You should use the Job Description and the context to get the details of the job but you should too be able to think like an applicant. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\n You can use the cover letter sample as an example provided to generate the cover letter and you always return the response in markdown or you will be penalized.\n.You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images.\n You should return well indented markdown.\n You will be penalized if you return non well indented markdown.\nthe applicant name, email, and phone number each rendered in a new line.You will be penalized if you dont render the name, email and phone number each in a new line.


  \n----------------\n


  CONTEXT:
  ${results.map((result) => result.pageContent).join("\n\n")}
   JOB TITLE: ${jobTitle}
  JOB DESCRIPTION: ${jobDescription}



   \n----------------\n


---
title: Application for [job] Position at [Company Name]
---

## Applicants Name

Applicants Address  \n
Phone: Applicants Phone  \n
Email: Applicants Email   \n
\n

[Date]\n
\n
[Name of employer]  \n
\n
[Mailing address of employer]  \n
\n
Dear [Hiring manager's name],  \n
\n
[Greet the hiring manager and state your name as well as the position you're applying for. These second and third sentences can mention how you found the position and express enthusiasm for the job. You can also mention if you heard about the position from a friend or if a colleague referred you.]

[This first sentence in your second paragraph can introduce the skills you've gained from educational courses, volunteer experience or extracurricular activities. You can feature examples of these specific skills and tie together how you can apply them to this job position during these next few sentences. Mention any other related achievements or awards and how they may benefit the company.]

[Your next paragraph can explain why you're the best candidate for the role. Mention any details you noticed on their website that you believe reflect your passion or motivations. You can also explain your dedication to learning more about the role and you're willingness to develop new skills in the position.]
[In your closing paragraph, explain your excitement for the role one last time. Thank the employer for their time and request an interview. Mention that you look forward to hearing from them soon.]
Sincerely,
[Your name]
[Your signature]


  `,
      },
    ],
    onFinish: async (completion) => {
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
            name: `${user.given_name} ${user.family_name}  coverletter ${fileId} `,
          },
          data: {
            text: completion.text,
          },
        });
      } else {
        await db.coverLetter.create({
          data: {
            name: `${user.given_name} ${user.family_name}  coverletter ${fileId} `,
            text: completion.text,
            id: fileId,
            userId: id,
          },
        });
      }
    },
  });

  // Respond with the stream
  return response.toTextStreamResponse();
};

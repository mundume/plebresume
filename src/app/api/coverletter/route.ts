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
    temperature: 0.6,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\nYou can use the cover letter sample as an example provided to generate the cover letter.\n You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images. \n You should return well indented markdown.\n You will be penalized if you return non well indented markdown",
      },
      {
        role: "user",
        content: `Use the following pieces of context  to generate a cover letter for the user. \nYou should be able to think like a person who is a job applicant. \nYou can use your other existing knowledge to generate the cover letter but dont go out of the context.\n You can use the cover letter sample as an example provided to generate the cover letter and you always return the response in markdown or you will be penalized.\n.You always answer the with markdown formatting.\n You will be penalized if you do not answer with markdown when it would be possible.\nThe markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.\nYou do not support images and never include images. You will be penalized if you render images.\n You should return well indented markdown.\n You will be penalized if you return non well indented markdown.


  \n----------------\n


  CONTEXT:
  ${results.map((result) => result.pageContent).join("\n\n")}

 \n----------------\n
 COVER LETTER SAMPLE:

Applicant Name,
Phone Number,
email,

${format(new Date().toLocaleDateString(), "MM/dd/yyyy")}

Dear Hiring Manager,

I am writing to apply for the Associate Software Engineer position with Up and Yonder Technologies. As an engineer with more than 10 years of experience with coding and project development, I believe I can add value to your team and help your organization accomplish its goals. I've always been interested in the development of middleware software platforms and would love to contribute to your current beta project for the construction of Up and Yonder's H20 Middleware Platform.

As an undergraduate at Blue Lake University, I gained cyber security and software development experience through my computer science internship with renowned computer scientists from Blue Lake. I've also developed and released several of my own programs, including the Giggawhat Design Suite and Lightdrawn Navigation for mobile.

My excellent attention to detail and quest for perfection allow me to produce quality code that requires less debugging. I pair excellent technical knowledge with collaboration and communication to ensure I support my team members while producing high-quality work.

During my time working with Smith & Rodriguez Technology Services and Products, I helped implement a new software review system that improved efficiency by 55% for the team. I also received positive feedback for my ability to both understand software and communicate its uses to potential customers and partners. As a lead software engineer with Smith & Rodriguez, I managed a small team of coding professionals and finished more than 50 software development projects over the course of the year.

I'm grateful that you've taken the time to consider me for the position. Please contact me if you have questions or want to discuss my candidacy further. I'm positive I can help Up & Yonder Technologies strive for greatness.

Sincerely,

Ralph Perez



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

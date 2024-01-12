import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { openai } from "@/lib/openai";
import { pinecone } from "@/lib/pinecone";
import { NextRequest } from "next/server";
import { coverLetterSchema } from "@/lib/validators/coverlettervalidator";

export const POST = async (req: NextRequest) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const id = user?.id;

  const body = await req.json();
  const { id: fileId } = coverLetterSchema.parse(body);
  console.log(fileId);
  if (!user?.id)
    return new Response("Unauthorized", {
      status: 401,
    });
};

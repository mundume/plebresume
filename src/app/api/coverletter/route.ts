import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { openai } from "@/lib/openai";
import { pinecone } from "@/lib/pinecone";

export const POST = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const id = user?.id;

  if (!user?.id)
    return new Response("Unauthorized", {
      status: 401,
    });
};

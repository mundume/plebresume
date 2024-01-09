import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/config/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Params = {
  params: {
    fileid: string;
  };
};

const Page = async ({ params }: Params) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id)
    redirect(`/auth-callback?origin=dashboard/${params.fileid}`);
  const file = await db.file.findFirst({
    where: {
      id: params.fileid,
      userId: user.id,
    },
  });
  return (
    <>
      <div className="w-1/2">
        <PdfRenderer url={file?.url!} />
      </div>
    </>
  );
};

export default Page;

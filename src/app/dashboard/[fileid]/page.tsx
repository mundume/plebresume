import CoverLetterRenderer from "@/components/CoverLetterRenderer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ResumeRenderer from "@/components/ResumeRenderer";
import { db } from "@/config/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { Provider } from "jotai";
import { ResumeContextProvider } from "@/components/Provider";

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
    <ResumeContextProvider fileId={file?.id!}>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="w-full md:w-1/2">
          <ResumeRenderer url={file?.url!} id={file?.id!} />
        </div>
        <div className="w-full md:w-1/2">
          <CoverLetterRenderer />
        </div>
      </div>
    </ResumeContextProvider>
  );
};

export default Page;

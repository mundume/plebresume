import CoverLetterRenderer from "@/components/CoverLetterRenderer";
import ResumeRenderer from "@/components/ResumeRenderer";
import { db } from "@/config/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { CoverLetterContextProvider } from "@/components/Provider";

type Params = {
  params: {
    fileid: string;
  };
};

const Page = async ({ params }: Params) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id)
    redirect(`/auth-callback?origin=coverletter/${params.fileid}`);
  // const file = await db.query.file.findFirst({
  //   where: {
  //     id: params.fileid,
  //     userId: user.id,
  //   },
  // });
  const file = await db.query.file.findFirst({
    where: (user, { eq }) => eq(user.id, user.id) && eq(user.id, params.fileid),
  });
  return (
    <CoverLetterContextProvider fileId={file?.id!}>
      <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-hidden md:flex-row break-inside-avoid-column">
        <div className="w-full md:w-1/2">
          <ResumeRenderer url={file?.url!} id={file?.id!} />
        </div>
        <div className="w-full md:w-1/2">
          <CoverLetterRenderer />
        </div>
      </div>
    </CoverLetterContextProvider>
  );
};

export default Page;

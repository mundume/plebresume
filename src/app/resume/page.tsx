import CreateResume from "@/components/create-resume";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ResumeBuilderContextProvider } from "@/components/resume-builder-context";
import ResumeBuilder from "@/components/resumebuilder";
import ResumePreviewer from "@/components/resumepreviewer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=resume");

  return (
    <>
      <ResumeBuilderContextProvider userId={user.id}>
        <CreateResume userId={user.id} />
        <main>
          <MaxWidthWrapper className="max-w-full ">
            <div className="flex gap-4 pt-4">
              <div className="w-6/12">
                <ResumeBuilder />
              </div>
              <div className="w-5/12 fixed top-6 right-20 ">
                <ResumePreviewer />
              </div>
            </div>
          </MaxWidthWrapper>
        </main>
      </ResumeBuilderContextProvider>
    </>
  );
};

export default Page;

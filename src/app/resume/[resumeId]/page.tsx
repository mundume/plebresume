import CreateResume from "@/components/create-resume";
import DownloadResume from "@/components/download-resume";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ResumeBuilderContextProvider } from "@/components/resume-builder-context";
import ResumeBuilder from "@/components/resumebuilder";
import ResumePreviewer from "@/components/resumepreviewer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { resumeId: string } }) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=resume");

  return (
    <>
      <ResumeBuilderContextProvider userId={user.id} resumeId={params.resumeId}>
        <main>
          <MaxWidthWrapper className="max-w-full">
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <div className="w-full md:w-6/12">
                <DownloadResume resumeId={params.resumeId} />
                <ResumeBuilder />
              </div>
              <div className="w-full md:w-5/12 md:ml-4">
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

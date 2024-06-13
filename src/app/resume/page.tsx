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
      <ResumeBuilderContextProvider>
        <main>
          <MaxWidthWrapper className="max-w-full ">
            <div className="flex gap-4 pt-4">
              <div className="w-6/12">
                <ResumeBuilder />
              </div>
              <div className="w-6/12">
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

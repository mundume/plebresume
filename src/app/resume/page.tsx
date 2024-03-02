import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ResumeBuilderContextProvider } from "@/components/resume-builder-context";
import ResumeBuilder from "@/components/resumebuilder";
import ResumePreviewer from "@/components/resumepreviewer";
import React from "react";

const Page = () => {
  return (
    <ResumeBuilderContextProvider>
      <main>
        <MaxWidthWrapper className="max-w-full">
          <div className="flex gap-4 pt-4">
            <div className="w-5/12">
              <ResumeBuilder />
            </div>
            <div className="w-7/12">
              <ResumePreviewer />
            </div>
          </div>
        </MaxWidthWrapper>
      </main>
    </ResumeBuilderContextProvider>
  );
};

export default Page;

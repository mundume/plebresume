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
          <div className="flex ">
            <div className="w-1/3">
              <ResumeBuilder />
            </div>
            <div className="w-2/3">
              <ResumePreviewer />
            </div>
          </div>
        </MaxWidthWrapper>
      </main>
    </ResumeBuilderContextProvider>
  );
};

export default Page;

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ResumeBuilder from "@/components/resumebuilder";
import ResumePreviewer from "@/components/resumepreviewer";
import React from "react";

const Page = () => {
  return (
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
  );
};

export default Page;

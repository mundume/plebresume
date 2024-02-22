import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ResumeBuilder from "@/components/resumebuilder";
import ResumePreviewer from "@/components/resumepreviewer";
import React from "react";

const Page = () => {
  return (
    <main>
      <MaxWidthWrapper className="max-w-full">
        <div>
          <ResumeBuilder />
        </div>
        <div>
          <ResumePreviewer />
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;

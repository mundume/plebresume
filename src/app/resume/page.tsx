import CreateResume from "@/components/create-resume";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ResumeBuilderContextProvider } from "@/components/resume-builder-context";
import ResumeBuilder from "@/components/resumebuilder";
import ResumePreviewer from "@/components/resumepreviewer";
import Resumes from "@/components/resumes";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=resume");

  return (
    <>
      <CreateResume userId={user.id} />
      <Resumes />
    </>
  );
};

export default Page;

"use client";
import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const Resumes = () => {
  const { data: resumes, isLoading, isError } = trpc.getResumes.useQuery();
  return (
    <div>
      {isLoading && <p>Loading...</p>}

      <div className="">
        {resumes?.map((resume) => (
          <Link href={`/resume/${resume.id}`} key={resume.id}>
            <p className={cn(buttonVariants({ variant: "link" }))}>
              {resume.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resumes;

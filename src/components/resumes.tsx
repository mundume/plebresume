"use client";
import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { DataTable } from "./DataTable";
import { resumeColumns } from "./resume-table-column";
import { Loader } from "lucide-react";

const Resumes = () => {
  const { data: resumes, isLoading, isError } = trpc.getResumes.useQuery();

  return (
    <div>
      {isLoading ? (
        <Loader className="w-8 h-8 animate-spin" />
      ) : (
        <div className="">
          {resumes ? (
            <DataTable columns={resumeColumns} data={resumes!} />
          ) : (
            <p>{isError ? "Something went wrong" : "No resumes found"}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Resumes;

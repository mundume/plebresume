"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import UserCard from "./UserCard";
import UploadButton from "./uploadButton";
import { Progress } from "./ui/progress";
import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChevronRight, FileText, Loader, Trash } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import DeleteFileButton from "./DeleteFileButton";
import SkeletonLoading from "./SkeletonLoading";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

type User = KindeUser;
const CoverLetterPage = ({ user }: { user: User }) => {
  const {
    data: getUserFiles,
    isLoading,
    isError,
    error,
  } = trpc.getUserFiles.useQuery();
  if (isError) {
    return <p className="text-6xl text-red-600">{error.message}</p>;
  }

  return (
    <>
      <div className="flex justify-between flex-1 mt-10 text-zinc-800">
        <div className="">
          <h2 className="pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0">
            Get your cover Letter
          </h2>
        </div>
        <UploadButton />
      </div>

      <>
        <div className="flex flex-wrap gap-4 py-10">
          {isLoading ? (
            <SkeletonLoading />
          ) : (
            <div className="w-full">
              <div className="w-full pt-10">
                <p className="pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0">
                  Recent files
                </p>
                <DataTable columns={columns} data={getUserFiles} />
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default CoverLetterPage;

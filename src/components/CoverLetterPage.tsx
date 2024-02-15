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
            <div>
              <p>Recent files</p>
              {getUserFiles?.map((file) => (
                <Card
                  key={file.id}
                  className="relative w-full p-0 rounded sm:w-56 h-28 "
                >
                  <CardContent className="p-4 ">
                    <div className="flex flex-wrap items-center flex-1 gap-2">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                      <h1 className="text-sm truncate ">
                        {file.name.length > 10
                          ? `${file.name.slice(0, 10)}...`
                          : file.name}
                      </h1>

                      <div className="absolute flex items-center top-1 right-1 ">
                        <DeleteFileButton fileId={file.id} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-center mt-4">
                    <Link
                      href={`/coverletter/${file.id}`}
                      className={buttonVariants({
                        variant: "default",
                      })}
                    >
                      View
                      <ChevronRight className="w-4 h-4 text-slate-500 ml-1.5" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default CoverLetterPage;
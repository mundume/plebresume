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
import Markdown from "react-markdown";

type User = KindeUser;
const Dashboard = ({ user }: { user: User }) => {
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
      <div className="flex justify-between flex-1 text-zinc-800">
        <UserCard user={user} />
        <UploadButton />
      </div>
      <div className="flex flex-wrap gap-4 py-10">
        {isLoading ? (
          <Loader className="w-8 h-8 animate-spin" />
        ) : (
          getUserFiles?.map((file) => (
            <Card
              key={file.id}
              className="relative w-full p-0 rounded sm:w-56 h-28 "
            >
              <CardContent className="p-4 ">
                <div className="flex flex-wrap items-center flex-1 gap-2">
                  <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                  <h1 className={`text-sm truncate  `}>
                    {file.name.length > 10
                      ? file.name.slice(0, 10) + "..."
                      : file.name}
                  </h1>

                  <div className="absolute flex items-center top-1 right-1 ">
                    <DeleteFileButton fileId={file.id} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center mt-4">
                <Link
                  href={`/dashboard/${file.id}`}
                  className={buttonVariants({
                    variant: "default",
                  })}
                >
                  View
                  <ChevronRight className="w-4 h-4 text-slate-500 ml-1.5" />
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;

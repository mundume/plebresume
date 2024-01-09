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
import { Loader } from "lucide-react";
import Link from "next/link";

type User = KindeUser;
const Dashboard = ({ user }: { user: User }) => {
  const { data: getUserFiles, isLoading } = trpc.getUserFiles.useQuery();

  return (
    <>
      <div className="flex justify-between flex-1">
        <UserCard user={user} />
        <UploadButton />
      </div>
      <div className="flex flex-wrap gap-4 py-10">
        {isLoading ? (
          <Loader className="w-8 h-8 animate-spin" />
        ) : (
          getUserFiles?.map((file) => (
            <Link
              key={file.id}
              className=" w-44"
              href={`/dashboard/${file.id}`}
            >
              {file.name}
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;

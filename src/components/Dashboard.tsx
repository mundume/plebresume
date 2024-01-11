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
import { Delete, File, FileText, Loader, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type User = KindeUser;
const Dashboard = ({ user }: { user: User }) => {
  const { data: getUserFiles, isLoading } = trpc.getUserFiles.useQuery();

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
            <Card key={file.id} className="p-0 rounded w-44 ">
              <CardContent className="p-4 ">
                <div>
                  <Button size={"icon"}>
                    <Trash className="w-4 h-4 text-slate-600" />
                  </Button>
                </div>
                <div className="flex items-center flex-1 gap-2">
                  <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                  <h1 className="text-sm truncate">{file.name}</h1>
                </div>
                <Link href={`/dashboard/${file.id}`}>View</Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;

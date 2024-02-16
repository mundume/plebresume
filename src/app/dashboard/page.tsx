import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserCard from "@/components/UserCard";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { db } from "@/config/prisma";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return (
    <MaxWidthWrapper className="mt-10 text-slate-900">
      <div className="flex items-center justify-between max-w-3xl">
        <div className="">
          <UserCard user={user!} />
        </div>
        <Link
          className="flex items-center justify-center gap-3 py-1 border rounded w-52 bg-zinc-50"
          href="https://"
        >
          <FileText className="w-5 h-5 text-green-500" />
          <div className="t">
            <h5 className="text-base font-semibold">Resume</h5>
            <p className="text-sm text-slate-500">create from scratch.</p>
          </div>
        </Link>
        <Link
          className="flex items-center justify-center gap-3 py-1 border rounded w-52 bg-zinc-50"
          href="/coverletter"
        >
          <FileText className="w-5 h-5 text-purple-500 " />
          <div className="t">
            <h5 className="text-base font-semibold ">Coverletter</h5>
            <p className="text-sm text-slate-500 ">create from scratch.</p>
          </div>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;

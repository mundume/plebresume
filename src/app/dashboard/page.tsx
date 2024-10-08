import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserCard from "@/components/UserCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
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
    <MaxWidthWrapper className="mt-10">
      <div className="flex flex-col justify-between w-full md:flex-row">
        <div className="w-full ">
          <UserCard user={user!} />
        </div>
        <div className="flex flex-col items-center gap-4 py-6 sm:gap-2 md:flex-row md:py-0">
          <Link
            className="flex items-center justify-center w-full gap-3 py-1 border rounded shadow md:w-52 bg-zinc-50 dark:bg-background"
            href="/resume"
          >
            <FileText className="w-5 h-5 text-green-500" />
            <div className="">
              <h5 className="text-base font-semibold ">Resume</h5>
              <p className="text-sm text-slate-500">create from scratch.</p>
            </div>
          </Link>
          <Link
            className="flex items-center justify-center w-full gap-3 py-1 border rounded shadow md:w-52 bg-zinc-50 dark:bg-background"
            href="/coverletter"
          >
            <FileText className="w-5 h-5 text-purple-500 " />
            <div className="">
              <h5 className="text-base font-semibold ">Coverletter</h5>
              <p className="text-sm text-slate-500 ">create from scratch.</p>
            </div>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;

import Dashboard from "@/components/Dashboard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserCard from "@/components/UserCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) redirect("/auth-callack?origin=dashboard");
  return (
    <MaxWidthWrapper className="px-2 pt-3 my-auto">
      <Dashboard user={user} />
    </MaxWidthWrapper>
  );
};

export default Page;

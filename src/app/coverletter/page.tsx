import CoverLetterPage from "@/components/CoverLetterPage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserCard from "@/components/UserCard";
import { db } from "@/config/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=coverletter");
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=coverletter");
  return (
    <MaxWidthWrapper className="px-2 pt-3 my-auto">
      <CoverLetterPage user={user} />
    </MaxWidthWrapper>
  );
};

export default Page;

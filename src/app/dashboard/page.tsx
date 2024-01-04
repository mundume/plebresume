import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) redirect("/auth-callack?origin=dashboard");
  return (
    <div>
      <p>
        {user?.email} {user?.given_name} {user?.family_name}
      </p>
    </div>
  );
};

export default Page;

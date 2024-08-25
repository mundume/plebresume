import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { TextGenerate } from "@/components/hero-text";
import { BackgroundDots } from "@/components/ui/background-beams";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <MaxWidthWrapper className="m-auto h-screen flex items-center justify-center">
      <TextGenerate user={user} />

      <BackgroundDots dotColor="#475569" />
    </MaxWidthWrapper>
  );
}

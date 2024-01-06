"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ sucess }) => {
      if (sucess) {
        router.push(origin ? `${origin}` : `/dashboard`);
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    retry: false,
    retryDelay: 500,
  });
  return (
    <div className="flex justify-center w-full mt-24">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin" />

        <p>You will be redirected automatically....</p>
      </div>
    </div>
  );
};

export default Page;

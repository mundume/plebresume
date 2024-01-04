import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user.email)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    return { sucess: true };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

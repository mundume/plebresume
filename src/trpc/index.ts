import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/config/db";
import {
  user as dbUser,
  file as dbFile,
  coverLetter as dbCoverLetter,
  resume as dbResume,
} from "@/config/schema";
import { eq } from "drizzle-orm";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user.email)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    const userFromDb = await db.query.user.findFirst({
      where: (data, { eq }) => eq(data.id, user.id),
    });

    if (!userFromDb) {
      await db.insert(dbUser).values([
        {
          id: user.id,
          firstName: user.family_name as string,
          lastName: user.given_name as string,
          email: user.email,
        },
      ]);
    }
    return { sucess: true };
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
    return await db.query.file.findMany({
      where: (user, { eq }) => eq(user.userId, user.id),
    });
  }),
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.query.file.findFirst({
        where: (file, { eq }) =>
          eq(file.key, input.key) && eq(file.userId, userId),
        // {
        //   key: input.key,
        //   userId,
        // },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });
      return file;
    }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.query.file.findFirst({
        where: (file, { eq }) =>
          eq(file.id, input.id) && eq(file.userId, userId),
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });
      await db
        .delete(dbFile && dbCoverLetter)
        .where(eq(dbFile.id, input.id) && eq(dbCoverLetter.userId, userId));

      return file;
    }),
  getCoverLetter: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { fileId } = input;
      const coverLetter = await db.coverLetter.findFirst({
        where: {
          id: fileId,
          userId,
        },
      });
      if (!coverLetter) throw new TRPCError({ code: "NOT_FOUND" });
      return coverLetter;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

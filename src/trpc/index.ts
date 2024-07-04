import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/config/prisma";
import { resumeSchema } from "@/lib/validators/resume-validator";
import {
  educationSchema,
  employmentSchema,
  HobbiesSchema,
  LanguagesFormSchema,
  LanguagesSchema,
  skillsFormSchema,
  skillsSchema,
  socialLinksSchema,
} from "@/lib/schemas";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user.email)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          firstName: user.family_name!,
          lastName: user.given_name!,
        },
      });
    }
    return { sucess: true };
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
    return await db.file.findMany({
      where: {
        userId: user.id,
      },
    });
  }),
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });
      return file;
    }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });
      await db.file.delete({
        where: {
          id: input.id,
        },
        include: {
          coverLetters: {
            where: {
              id: input.id,
              userId,
            },
          },
        },
      });
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
  createResume: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx }) => {
      const { userId } = ctx;
      const user = await db.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });
      const resume = await db.createdResume.create({
        data: {
          userId,
          name: `${user.firstName} ${user.lastName} resume ${Date.now()}`,
        },
      });
      return resume;
    }),
  getResumes: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return await db.createdResume.findMany({
      where: {
        userId,
      },
    });
  }),

  deleteResume: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const resume = await db.createdResume.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });
      await db.createdResume.delete({
        where: {
          id: input.id,
        },
        include: {
          education: true,
          workExperience: true,
          socialLinks: true,
        },
      });
      return resume;
    }),
  addPersonalInformation: privateProcedure
    .input(z.object({ resume: resumeSchema, resumeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const resume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });
      await db.createdResume.update({
        where: {
          id: input.resumeId,
          userId,
        },
        data: {
          firstName: input.resume.resume.names.firstName,
          lastName: input.resume.resume.names.lastName,
          city: input.resume.resume.address.city,
          state: input.resume.resume.address.state,
          email: input.resume.resume.email,
          profession: input.resume.resume.proffession,
          phone: input.resume.resume.phone,
          profile: input.resume.resume.profile,
        },
      });

      return resume;
    }),

  addWorkExperience: privateProcedure
    .input(
      z.object({
        resumeId: z.string(),
        workExperience: employmentSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const resume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });
      await Promise.all(
        input.workExperience.experience.map((experience) =>
          db.workExperience.createMany({
            data: {
              resumeId: input.resumeId,
              title: experience.title,
              name: experience.name,
              description: experience.description,
              location: experience.location,
              startDate: experience.startDate,
              endDate: experience.endDate,
              currently: experience.currently,
            },
          })
        )
      );

      const updatedResume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
        include: {
          workExperience: true,
        },
      });
      console.log(updatedResume);

      return updatedResume;
    }),

  addEducation: privateProcedure
    .input(
      z.object({
        resumeId: z.string(),
        education: educationSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const resume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });

      await Promise.all(
        input.education.education.map((education) =>
          db.education.createMany({
            data: {
              resumeId: input.resumeId,
              ...education,
            },
          })
        )
      );
      const updatedResume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
        include: {
          education: true,
        },
      });
      console.log(updatedResume);
      return updatedResume;
    }),
  addSocialLinks: privateProcedure
    .input(
      z.object({
        resumeId: z.string(),
        socialLinks: socialLinksSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const resume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });

      await Promise.all(
        input.socialLinks.socialLinks.map((socialLink) =>
          db.socialLink.createMany({
            data: {
              resumeId: input.resumeId,
              ...socialLink,
            },
          })
        )
      );

      const updatedResume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
        include: {
          socialLinks: true,
        },
      });

      return updatedResume;
    }),
  addSkills: privateProcedure
    .input(z.object({ resumeId: z.string(), skills: skillsFormSchema }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const resume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });

      await Promise.all(
        input.skills.skills.map((skill) =>
          db.skill.createMany({
            data: {
              resumeId: input.resumeId,
              ...skill,
            },
          })
        )
      );

      const updatedResume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
        include: {
          skills: true,
        },
      });

      console.log(updatedResume);

      return updatedResume;
    }),
  addHobbies: privateProcedure
    .input(z.object({ resumeId: z.string(), hobbies: HobbiesSchema }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const resume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });
      const updatedResume = await db.createdResume.update({
        where: {
          id: input.resumeId,
          userId,
        },
        data: {
          ...resume,
          hobbies: input.hobbies.hobbies,
        },
      });

      return updatedResume;
    }),
  addLanguages: privateProcedure
    .input(z.object({ resumeId: z.string(), languages: LanguagesFormSchema }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const resume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
      });
      if (!resume) throw new TRPCError({ code: "NOT_FOUND" });
      await Promise.all(
        input.languages.languages.map((language) =>
          db.language.createMany({
            data: {
              resumeId: input.resumeId,
              ...language,
            },
          })
        )
      );

      const updatedResume = await db.createdResume.findUnique({
        where: {
          id: input.resumeId,
          userId,
        },
        include: {
          languages: true,
        },
      });

      console.log(updatedResume);
      return updatedResume;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

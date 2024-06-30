import { NextRequest, NextResponse } from "next/server";
import { compile } from "@onedoc/react-print";
import { Receipt } from "@/components/reciepts";
import { Onedoc } from "@onedoc/client";
import Resume from "@/components/resume";
import { TailwindResume } from "@/components/tailwind-resume";
import ResumePreviewer from "@/components/resumepreviewer";
import { db } from "@/config/prisma";

const onedoc = new Onedoc(process.env.ONEDOC_API_KEY!);
// Opt out of caching for all data requests in the route segment

export const GET = async (req: NextRequest) => {
  const p = await db.createdResume.findFirst({
    where: {
      id: "cly083kfx000593cpfeqw1p6n",
    },
    include: {
      education: true,
      workExperience: true,
    },
  });
  const l = await db.education.findMany();

  console.log(l);

  console.log(p);

  const values = {
    personalInfo: {
      names: {
        firstName: p?.firstName!,
        lastName: p?.lastName!,
      },
      email: p?.email!,
      phone: p?.phone!,
      proffession: p?.profession!,
      profile: p?.profile!,
      address: {
        city: p?.city!,
        state: p?.state!,
      },
    },
    // workExperience: [
    //   {.
    //     companyName: "Plebs x Degens LLC",
    //     description:
    //       "personality hire you know just doing nothing and being lazy you know what im saying, but i cant be fired because the office will get boring without me you know what im saying",
    //     endDate: "mar/2024",
    //     startDate: "jan/2022",
    //     title: "Vibes Engineer",
    //   },
    // ],
  };

  const { file, error } = await onedoc.render({
    html: await compile(Resume({ values: values })),
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pdfBuffer = Buffer.from(file);

  // Return the PDF
  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
};

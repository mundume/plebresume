import { NextRequest, NextResponse } from "next/server";
import { compile } from "@onedoc/react-print";
import { Receipt } from "@/components/reciepts";
import { Onedoc } from "@onedoc/client";
import Resume from "@/components/resume";
import { TailwindResume } from "@/components/tailwind-resume";
import ResumePreviewer from "@/components/resumepreviewer";
import { db } from "@/config/prisma";

const onedoc = new Onedoc(process.env.ONEDOC_API_KEY!);

export const GET = async (req: NextRequest) => {
  const p = await db.createdResume.findFirst({
    where: {
      id: "clxw32ye70003kwm39brl5a2r",
    },
  });
  const receipt = {
    id: 1,
    date: "2021-01-01",
    total: 100,
  };
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

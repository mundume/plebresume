import { NextRequest, NextResponse } from "next/server";
import { compile } from "@onedoc/react-print";
import { Onedoc } from "@onedoc/client";
import Resume from "@/components/resume";
import { db } from "@/config/prisma";

const onedoc = new Onedoc(process.env.ONEDOC_API_KEY!);
// Opt out of caching for all data requests in the route segment

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const resumeId = searchParams.get("id");

  const resume = await db.createdResume.findFirst({
    where: {
      id: resumeId as string,
    },
    include: {
      education: true,
      workExperience: true,
      languages: true,
      skills: true,
      socialLinks: true,
    },
  });

  const { file, error } = await onedoc.render({
    html: await compile(Resume(resume!)),
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

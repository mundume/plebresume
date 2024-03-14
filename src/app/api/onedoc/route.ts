import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { compile } from "@onedoc/react-print";
import { Receipt } from "@/components/reciepts";
import { Onedoc } from "@onedoc/client";
import Resume from "@/components/resume";

const onedoc = new Onedoc(process.env.ONEDOC_API_KEY!);

export const GET = async (req: NextApiRequest) => {
  const receipt = {
    id: 1,
    date: "2021-01-01",
    total: 100,
  };
  const values = {
    values: {
      personalInfo: {
        names: {
          firstName: "Nzai",
          lastName: "Kilonzo",
        },
        email: "nzaik@me.com",
        phone: "0700000000",
        proffession: "Software Engineer",
        profile:
          "Highly skilled UI Engineer with 5 years of experience in designing and developing intuitive user interfaces for web and mobile applications. Proficient in HTML, CSS, JavaScript, and modern front-end frameworks such as React and Vue.js. Passionate about blending design aesthetics with technical functionality to create seamless user experiences. Strong collaborator with UX designers and backend developers to deliver innovative solutions that exceed user expectations.",
        address: {
          city: "Kibandahasara",
          state: "Kenya",
        },
      },
      // workExperience: [
      //   {
      //     companyName: "Plebs x Degens LLC",
      //     description:
      //       "personality hire you know just doing nothing and being lazy you know what im saying, but i cant be fired because the office will get boring without me you know what im saying",
      //     endDate: "mar/2024",
      //     startDate: "jan/2022",
      //     title: "Vibes Engineer",
      //   },
      // ],
    },
  };

  const { file, error } = await onedoc.render({
    html: await compile(Resume(values)),
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

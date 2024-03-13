import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { compile } from "@onedoc/react-print";
import { Receipt } from "@/components/reciepts";
import { Onedoc } from "@onedoc/client";

const onedoc = new Onedoc(process.env.ONEDOC_API_KEY!);

export const GET = async (req: NextApiRequest) => {
  const receipt = {
    id: 1,
    date: "2021-01-01",
    total: 100,
  };

  const { file, error } = await onedoc.render({
    html: await compile(Receipt(receipt)),
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

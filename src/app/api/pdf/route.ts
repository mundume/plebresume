import { NextResponse } from "next/server";
import { POST } from "./../coverletter/route";
import * as fs from "fs";

export const genPdf = async (req: Request, res: Response) => {
  const body = await req.json();
  const { content, css } = body;

  const font =
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  const pdf = await fetch("https://md-to-pdf.fly.dev", {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `markdown=${encodeURIComponent(content)}&css=${encodeURIComponent(
      `
      h1, h2, h3, h4 {
         font-family: "Helvetica", sans-serif;
         font-size:"1rem"
  font-weight:800px;
  color:#18181B;
       }

       p {
    font-family: ${font};
  }`
    )}`,
    cache: "no-store",
  });
  const response = await pdf.arrayBuffer();
  fs.writeFileSync("./_weduh", Buffer.from(response));
  return new NextResponse(response);
};

export { genPdf as POST };

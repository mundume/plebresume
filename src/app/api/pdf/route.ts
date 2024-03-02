import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const { content, css } = body;
  const { signal } = new AbortController();

  const font =
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  const styles = `
h2 {
  color:#111827;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 1.3333333;
     font-family: "Arial", sans-serif;
     background-color: #fff;
}

 h3, h4 {
 color:#111827;
    font-size: 1.25em;
    font-weight: 600;
     font-family:"Arial", sans-serif;
    display:block;
    background-color: #fff;


}

a {
    color: #4F46E5;
    font-family: "Arial", sans-serif;
}

p {
    color:1C2024;
    font-family: ${font};
    display:block;
     box-sizing: border-box;
     background-color: #fff;

}
`;

  const pdf = await fetch("https://md-to-pdf.fly.dev", {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/pdf",
    },
    body: `markdown=${encodeURIComponent(content)}&css=${encodeURIComponent(
      styles
    )}&engine=${encodeURIComponent("weasyprint")}`,
    cache: "no-store",
  });

  const response = await pdf.arrayBuffer();
  return new NextResponse(response);
};

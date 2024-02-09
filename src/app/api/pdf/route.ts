import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { ReadableOptions } from "stream";
import * as fs from "fs";

// Host the tar-file yourself
// Or use https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar
const chromiumPack =
  "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

// function streamFile(
//   path: string,
//   options?: ReadableOptions
// ): ReadableStream<Uint8Array> {
//   const downloadStream = fs.createReadStream(path, options);

//   return new ReadableStream({
//     start(controller) {
//       downloadStream.on("data", (chunk: Buffer) =>
//         controller.enqueue(new Uint8Array(chunk))
//       );
//       downloadStream.on("end", () => controller.close());
//       downloadStream.on("error", (error: NodeJS.ErrnoException) =>
//         controller.error(error)
//       );
//     },
//     cancel() {
//       downloadStream.destroy();
//     },
//   });
// }

const handler = async (req: NextRequest, res: NextResponse) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    // See https://www.npmjs.com/package/@sparticuz/chromium#running-locally--headlessheadful-mode for local executable path
    executablePath: await chromium.executablePath(chromiumPack),
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://github.com/mundume");
  const pdf = await page.pdf({ format: "A4" });
  const headers = {
    headers: {
      "Content-Type": "application/pdf",
    },
  };

  return new Response(pdf, headers);
};

// Uncomment if needed, only applicable if your plan allows it
// export const maxDuration = 300; // Seconds

export { handler as POST };

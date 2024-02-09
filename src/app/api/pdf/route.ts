import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

// Host the tar-file yourself
// Or use https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar
const chromiumPack =
  "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

const handler = async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    // See https://www.npmjs.com/package/@sparticuz/chromium#running-locally--headlessheadful-mode for local executable path
    executablePath: await chromium.executablePath(chromiumPack),
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://google.com", { waitUntil: "networkidle0" });
  const title = await page.evaluate(() => {
    return document.title;
  });
  console.log(title);
  return NextResponse.json({ title });
};

// Uncomment if needed, only applicable if your plan allows it
// export const maxDuration = 300; // Seconds

export { handler as POST };

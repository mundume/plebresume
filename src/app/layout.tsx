import type { Metadata } from "next";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import Provider from "./_trpc/provider";
import { NavBar } from "@/components/NavBar";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import "simplebar-react/dist/simplebar.min.css";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Plebresume",
  description:
    "Where plebs like you get unlimited ai assisted resumes and coverletters for free",
  openGraph: {
    title: "Plebresume",
    description:
      "Where plebs like you get unlimited ai assisted resumes and coverletters for free",
    images: `/api/og`,
  },
  twitter: {
    title: "Plebresume",
    description:
      "Where plebs like you get unlimited ai assisted resumes and coverletters for free",
    images: `/api/og`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Plebresume</title>
        <meta property="og:image" content="/api/og" />
        <meta property="twitter:image" content="/api/og" />
      </Head>
      <Provider>
        <body className={`${GeistSans.className} bg-background `}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <NavBar />
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </Provider>
    </html>
  );
}

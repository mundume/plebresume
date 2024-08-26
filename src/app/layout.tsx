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
        <meta
          name="description"
          content="Where plebs like you get unlimited ai assisted resumes and coverletters for free"
        />

        <meta property="og:url" content="https://plebresume.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Plebresume" />
        <meta
          property="og:description"
          content="Where plebs like you get unlimited ai assisted resumes and coverletters for free"
        />
        <meta
          property="og:image"
          content="https://plebresume.vercel.app/api/og"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="plebresume.vercel.app" />
        <meta property="twitter:url" content="https://plebresume.vercel.app" />
        <meta name="twitter:title" content="Plebresume" />
        <meta
          name="twitter:description"
          content="Where plebs like you get unlimited ai assisted resumes and coverletters for free"
        />
        <meta
          name="twitter:image"
          content="https://plebresume.vercel.app/api/og"
        />
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

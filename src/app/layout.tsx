import type { Metadata } from "next";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import Provider from "./_trpc/provider";
import { NavBar } from "@/components/NavBar";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import "simplebar-react/dist/simplebar.min.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

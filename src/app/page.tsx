"use client";

import Image from "next/image";
import { trpc } from "./_trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditorComp = dynamic(() => import("./EditorComponent"), {
  ssr: false,
});

const markdown = `
Hello **world**!
`;
export default function Home() {
  return (
    <MaxWidthWrapper>
      <Suspense fallback="........">
        <EditorComp markdown={markdown} />
      </Suspense>

      <h1 className="text-6xl">Welcome to Brixton</h1>
    </MaxWidthWrapper>
  );
}

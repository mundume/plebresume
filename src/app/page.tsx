"use client";

import Image from "next/image";
import { trpc } from "./_trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <h1 className="text-6xl">Welcome to Brixton</h1>
    </MaxWidthWrapper>
  );
}

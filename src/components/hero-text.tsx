"use client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `hello 👋, my name is nzai. i built plebresume as a way for myself to learn RAG and to have a cool looking resume/coverletter. much love 🤗.
`;

type Props = {
  user: KindeUser | null;
};
export function TextGenerate({ user }: Props) {
  return (
    <TextGenerateEffect words={words} className="text-center" user={user} />
  );
}

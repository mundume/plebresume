"use client";

import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { Download, Loader } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import MarkDown from "react-markdown";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {},
  },
});

const CoverLetter = ({ coverLetter }: { coverLetter: string }) => {
  return (
    <div className="px-6">
      <MarkDown
        className="prose text-wrap "
        rehypePlugins={[rehypeHighlight, rehypeReact]}
        remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
      >
        {coverLetter}
      </MarkDown>
    </div>
  );
};

export default CoverLetter;

"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { createTw } from "react-pdf-tailwind";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import MarkDown from "react-markdown";
import { useState } from "react";
import * as commands from "@uiw/react-md-editor/commands";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {},
  },
});

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: true });

const CoverLetter = ({ coverLetter }: { coverLetter: string }) => {
  const [updateCoverLetter, setUpdateCoverLetter] =
    useState<string>(coverLetter);
  return (
    <>
      {/* <div
        className="px-4 prose border border-dashed bg-white/90"
        contentEditable="true"
        onInput={(e) => setUpdateCoverLetter(e.currentTarget.innerText)}
      > */}
      {/* <MarkDown
          className="prose prose-p:text-wrap"
          rehypePlugins={[rehypeHighlight, rehypeReact]}
          remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
          skipHtml
        >
          {updateCoverLetter}
        </MarkDown> */}
      {/* </div> */}

      <MDEditor
        className="h-[1200px]"
        value={updateCoverLetter}
        // @ts-expect-error
        onChange={setUpdateCoverLetter}
        preview="edit"
      />
    </>
  );
};

export default CoverLetter;

"use client";

import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import MarkDown from "react-markdown";

const CoverLetter = ({ coverLetter }: { coverLetter: string }) => {
  const [updateCoverLetter, setUpdateCoverLetter] =
    useState<string>(coverLetter);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdateCoverLetter(event.target.value);
  };

  return (
    <>
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          <MarkDown
            className="prose prose-p:text-wrap"
            rehypePlugins={[rehypeHighlight, rehypeReact]}
            remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
            skipHtml
          >
            {updateCoverLetter}
          </MarkDown>
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

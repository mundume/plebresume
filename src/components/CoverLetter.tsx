"use client";

import React, { useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import MarkDown from "react-markdown";
import { MDXEditorMethods } from "@mdxeditor/editor";

const CoverLetter = ({
  coverLetter,
  preview,
  response,
}: {
  coverLetter: string;
  preview: boolean;
  response: string;
}) => {
  const [updateCoverLetter, setUpdateCoverLetter] =
    useState<string>(coverLetter);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdateCoverLetter(event.target.value);
  };
  const ref = useRef<MDXEditorMethods>(null);

  return (
    <>
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          <MarkDown>{response}</MarkDown>
          {/* <ForwardRefEditor
            markdown={response}
            onChange={(e) => {
            console.log(e);
            }}
            ref={ref}
          /> */}
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

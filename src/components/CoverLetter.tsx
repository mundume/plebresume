"use client";

import React, { useState } from "react";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";

const CoverLetter = ({
  coverLetter,
  preview,
  value,
}: {
  coverLetter: string;
  preview: boolean;
  value: string;
}) => {
  const [updateCoverLetter, setUpdateCoverLetter] =
    useState<string>(coverLetter);
  const ref = React.useRef<MDXEditorMethods>(null);

  const handleChange = (value: string) => {
    if (ref.current) {
      ref.current.setMarkdown(value);
    }
  };

  return (
    <>
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          <ForwardRefEditor
            markdown={updateCoverLetter}
            readOnly={preview}
            ref={ref}
            onChange={() => console.log("west")}
          />
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

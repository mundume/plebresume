"use client";

import React, { Suspense, useEffect, useState } from "react";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "./ui/button";

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
      ref.current.insertMarkdown(value);
    }
  };

  return (
    <>
      <Button onClick={() => ref.current?.insertMarkdown(coverLetter)}>
        Insert new markdown
      </Button>
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          <Suspense fallback={"..........."}>
            <ForwardRefEditor
              markdown={updateCoverLetter}
              ref={ref}
              onChange={(e) => console.log(e)}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

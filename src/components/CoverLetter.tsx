"use client";

import React, { Suspense, useEffect, useState } from "react";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "./ui/button";

const CoverLetter = ({
  coverLetter,
  preview,
}: {
  coverLetter: string;
  preview: boolean;
}) => {
  const [value, setValue] = useState<string>("");
  const ref = React.useRef<MDXEditorMethods>(null);

  const handleChange = (value: string) => {
    if (ref.current) {
      ref.current.insertMarkdown(value);
    }
  };
  useEffect(() => {
    ref.current?.setMarkdown(value);
  });

  return (
    <>
      {/* <Button onClick={() => ref.current?.insertMarkdown(value)}>
        Insert new markdown
      </Button> */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border border-dashed"
      />
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          <Suspense fallback={"..........."}>
            <ForwardRefEditor
              markdown={coverLetter}
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

"use client";

import React, { Suspense, useEffect, useState } from "react";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "./ui/button";

const CoverLetter = ({
  preview,
  response,
}: {
  preview: boolean;
  response: string;
}) => {
  const [value, setValue] = useState<string>(response);
  const ref = React.useRef<MDXEditorMethods>(null);

  useEffect(() => {
    setValue(response);
    ref.current?.setMarkdown(value);
  }, [value, response]);

  return (
    <>
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          <Suspense fallback={"..........."}>
            <ForwardRefEditor
              markdown={""}
              ref={ref}
              onChange={(e) => console.log(e)}
              readOnly={preview}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "./ui/button";
import { on } from "events";
import { useResumeContext } from "./Provider";

const CoverLetter = ({
  preview,
  response,
}: {
  preview: boolean;
  response: string;
}) => {
  const { updateResponse } = useResumeContext();

  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(response);
  }, [response]);

  return (
    <>
      <div className="h-full px-4 prose border border-dashed bg-white/90 no-break-inside">
        <div className="mt-2">
          <Suspense fallback={"..........."}>
            <ForwardRefEditor
              markdown={""}
              ref={ref}
              onChange={(e) => {
                console.log(e);

                updateResponse(e);
              }}
              readOnly={preview}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

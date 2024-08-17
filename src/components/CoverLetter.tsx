"use client";
import { useEffect, useRef } from "react";

import { ForwardRefEditor } from "./ForwardedRefEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useCoverLetterContext } from "./Provider";

const CoverLetter = ({
  preview,
  response,
}: {
  preview: boolean;
  response: string;
}) => {
  const { updateResponse } = useCoverLetterContext();

  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(response);
  }, [response]);

  return (
    <>
      <div className="h-full px-4 prose bg-white no-break-inside bg">
        <div className="">
          <ForwardRefEditor
            markdown={""}
            ref={ref}
            onChange={(e) => {
              updateResponse(e);
            }}
            readOnly={preview}
          />
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

"use client";

import React, { useRef, useState } from "react";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import MarkDown from "react-markdown";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "./ui/button";

const CoverLetter = ({
  coverLetter,
  preview,
  response,
}: {
  coverLetter: string;
  preview: boolean;
  response: string;
}) => {
  const [updateCoverLetter, setUpdateCoverLetter] = useState<string>(response);

  // const ref = useRef<MDXEditorMethods>(null);

  return (
    <>
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          {/* <Button onClick={() => ref.current?.setMarkdown("## new markdown")}>
            Set new markdown
          </Button> */}
          <MarkDown>{response}</MarkDown>
          <ForwardRefEditor markdown={coverLetter} />
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

"use client";

import React, { useState } from "react";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardedRefEditor";

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

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdateCoverLetter(event.target.value);
  };

  return (
    <>
      <div className="px-4 prose border border-dashed bg-white/90">
        <div className="mt-2">
          <ForwardRefEditor markdown={updateCoverLetter} readOnly={preview} />
        </div>
      </div>
    </>
  );
};

export default CoverLetter;

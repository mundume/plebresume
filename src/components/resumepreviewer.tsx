"use client";
import React, { useEffect, useState } from "react";

import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useResumeBuilderContext } from "./resume-builder-context";

const ResumePreviewer = () => {
  const { values } = useResumeBuilderContext();
  const { ref, height } = useResizeDetector();

  const { address, email, names, phone, profile } = values.personalInfo;
  const {} = values.workExperience;
  return (
    <div className="block w-full min-h-screen">
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref} className="p-10 font-sans text-slate-800">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">
              {names.firstName} {names.lastName}
            </h1>
            <h1 className="p-2 text-xl border rounded-full ">NK</h1>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ResumePreviewer;

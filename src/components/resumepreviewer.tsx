"use client";
import React, { useEffect, useState } from "react";

import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useResumeBuilderContext } from "./resume-builder-context";

const ResumePreviewer = () => {
  const { values } = useResumeBuilderContext();
  const { ref, height } = useResizeDetector();

  const { address, email, names, phone, profile, proffession } =
    values.personalInfo;
  const {} = values.workExperience;
  return (
    <div className="items-center block w-full min-h-screen m-auto shadow-2xl">
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref} className="p-10 font-sans text-slate-800">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-4xl font-bold">
                {names.firstName} {names.lastName}
              </h1>
              <span className="p-2 text-xl border rounded-full ">NK</span>
            </div>
            <p className="py-4 font-semibold">{proffession}</p>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ResumePreviewer;

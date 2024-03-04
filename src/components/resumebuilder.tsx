"use client";

import React from "react";
import { useResumeBuilderContext } from "./resume-builder-context";
import ResumeInfoAccordition from "./resume-info-accordition";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();

  return (
    <>
      <div>
        <ResumeInfoAccordition
          values={values.personalInfo}
          dispatch={dispatch}
          name="personal information"
        />
      </div>
      <div></div>
    </>
  );
};

export default ResumeBuilder;

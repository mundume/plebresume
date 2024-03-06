"use client";

import React from "react";
import { useResumeBuilderContext } from "./resume-builder-context";
import ResumeInfoAccordition from "./resume-personal-info-accordition";
import SkillsAccordition from "./resume-experience-accordition";

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
      <div>
        <SkillsAccordition
          values={values.workExperience}
          dispatch={dispatch}
          name="skills"
        />
      </div>
    </>
  );
};

export default ResumeBuilder;

"use client";

import React from "react";
import { useResumeBuilderContext } from "./resume-builder-context";
import ResumeInfoAccordition from "./resume-personal-info-accordition";
import SkillsAccordition from "./resume-experience-accordition";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();
  const valuess = [
    {
      companyName: "glglg",
      description: "lglg",
      endDate: "hlhhl",
      startDate: "hkhkh",
      title: "hhkhk",
    },
  ];
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
          name="Work Experience"
        />
      </div>
    </>
  );
};

export default ResumeBuilder;

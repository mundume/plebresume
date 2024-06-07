"use client";
import { useResumeBuilderContext } from "./resume-builder-context";
import ResumeInfoAccordition from "./resume-personal-info-accordition";
import SkillsAccordition from "./resume-experience-accordition";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();
  const context = useResumeBuilderContext();

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
        <SkillsAccordition name="Work Experience" />
      </div>
    </>
  );
};

export default ResumeBuilder;

"use client";
import { useResumeBuilderContext } from "./resume-builder-context";
import ResumeInfoAccordition from "./resume-personal-info-accordition";
import GenericFormParent from "./generic-form-parent";
import AddExperienceForm from "./add-experience-form";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();
  const context = useResumeBuilderContext();

  return (
    <div className="space-y-4">
      <div>
        <ResumeInfoAccordition
          values={values.personalInfo}
          dispatch={dispatch}
          name="personal information"
        />
      </div>
      <div>
        <AddExperienceForm />
      </div>
      <div
        className="
      "
      >
        <GenericFormParent />
      </div>
    </div>
  );
};

export default ResumeBuilder;

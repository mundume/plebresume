"use client";
import { useResumeBuilderContext } from "./resume-builder-context";
import ResumeInfoAccordition from "./resume-personal-info-accordition";
import AddExperienceForm from "./add-experience-form";
import SocialLinks from "./social-links";
import SkillsForm from "./skills-form";
import HobbiesForm from "./hobbies-form";
import LanguagesForm from "./languages-form";
import EducationForm from "./add-education-form";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();
  const context = useResumeBuilderContext();

  return (
    <div className="space-y-4">
      <div>
        <ResumeInfoAccordition
          values={values.resume.resume}
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
        <EducationForm />
      </div>
      <div>
        <SocialLinks />
      </div>
      <div className="">
        <SkillsForm />
      </div>
      <div className="">
        <HobbiesForm />
      </div>
      <div className="">
        <LanguagesForm />
      </div>
    </div>
  );
};

export default ResumeBuilder;

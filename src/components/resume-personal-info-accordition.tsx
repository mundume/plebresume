import React from "react";
import { type Action } from "./resume-builder-context";
import PersonalInformationAccordition from "./personal-information-accordition";
import { PersonalInfomationValues } from "@/lib/validators/resume-validator";

const ResumeInfoAccordition = () => {
  return (
    <div className="space-y-4 border p-6 rounded">
      <div>
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className=" text-sm  text-slate-600">
          add your personal information.
        </p>
      </div>
      <PersonalInformationAccordition />
    </div>
  );
};

export default ResumeInfoAccordition;

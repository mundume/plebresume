import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye, User } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { type initialState, type Action } from "./resume-builder-context";
import PersonalInformationAccordition from "./personal-information-accordition";
import { PersonalInfomationValues } from "@/lib/validators/resume-validator";
import { cn } from "@/lib/utils";

type AccorditionProps = {
  values: PersonalInfomationValues;
  dispatch: React.Dispatch<Action>;
  name: string;
};
const ResumeInfoAccordition = ({
  values,
  dispatch,
  name,
}: AccorditionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className=" text-sm  text-slate-600">
          add your personal information.
        </p>
      </div>
      <PersonalInformationAccordition dispatch={dispatch} values={values} />
    </div>
  );
};

export default ResumeInfoAccordition;

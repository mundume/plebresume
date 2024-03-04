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
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="font-semibold lg:text-xl"
            icon={
              <span
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "outline",
                  })
                )}
              >
                <Eye className="w-5 h-5 text-slate-500" />
              </span>
            }
          >
            <div className="flex items-center">
              <User className="w-6 h-6 mr-1.5 text-slate-500" />
              <p className="text-slate-800">{name}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-none">
            <PersonalInformationAccordition
              values={values}
              dispatch={dispatch}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeInfoAccordition;

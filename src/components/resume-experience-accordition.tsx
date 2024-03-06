import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Eye, User } from "lucide-react";
import { WorkExperienceValues } from "@/lib/validators/resume-validator";
import { Action } from "./resume-builder-context";
import AddExperience from "./resume-add-experiences";

type AccorditionProps = {
  values: WorkExperienceValues;
  dispatch: React.Dispatch<Action>;
  name: string;
};
const SkillsAccordition = ({ dispatch, name, values }: AccorditionProps) => {
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
            <AddExperience values={values} dispatch={dispatch} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SkillsAccordition;

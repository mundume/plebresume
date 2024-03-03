import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye, User } from "lucide-react";
import { Button } from "./ui/button";

const PersonalInfoAccordition = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="font-semibold lg:text-xl"
            icon={
              <Button size="icon" variant={"pleb"}>
                <Eye className="w-4 h-4 text-slate-500" />
              </Button>
            }
          >
            <div className="flex items-center">
              <User className="w-6 h-6 mr-1.5 text-slate-500" />
              <p className="text-slate-800">Personal Information</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PersonalInfoAccordition;

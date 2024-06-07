import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Eye, User } from "lucide-react";
import AddExperience from "./resume-add-experiences";

type AccorditionProps = {
  name: string;
};
const SkillsAccordition = ({ name }: AccorditionProps) => {
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
              <p className="font-sans text-slate-800">{name}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-none">
            <AddExperience />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SkillsAccordition;

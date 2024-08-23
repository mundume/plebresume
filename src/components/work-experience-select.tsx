import { generateWorkexperience } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useTransition } from "react";
import SimpleBar from "simplebar-react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { UseFormReturn } from "react-hook-form";
import { EmploymentSchema } from "@/lib/schemas";

type Description = {
  workExperience: string;
};
type Props = {
  input: string;
  index: number;
  form: UseFormReturn<EmploymentSchema>;
};

export const WorkExperienceSelect = ({ input, form, index: i }: Props) => {
  const [pending, startTransition] = useTransition();
  const { setValue, getValues } = form;

  const [generatedDescription, setGeneratedDescription] = useState<
    Description[]
  >([]);
  const l = getValues(`experience.${i}.location`);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open && input.length > 6) {
      const debounceTimer = setTimeout(() => {
        startTransition(async () => {
          const { workexperience } = await generateWorkexperience({ input });
          setGeneratedDescription(workexperience.workexperience);
        });
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [open, input, startTransition]);

  return (
    <div className="absolute right-1 top-0">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size={"sm"}
            className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full 
            bg-slate-950 px-3 py-1 text-xs  text-slate-300 backdrop-blur-3xl"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-yellow-400" />
              play
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="text-xs w-[400px] h-[400px]">
          <SimpleBar className="flex items-center justify-center text-xs w-full h-full my-auto">
            {pending ? (
              <p>loading...</p>
            ) : (
              <>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {generatedDescription.map((description, index) => (
                  <Card
                    onClick={() => {
                      const currentDescription =
                        getValues(`experience.${i}.description`) || "";
                      const newDescription = currentDescription
                        ? `${currentDescription}\n- ${description.workExperience}`
                        : `- ${description.workExperience}`;
                      setValue(
                        `experience.${i}.description`,
                        newDescription.trim()
                      );
                    }}
                    className="p-4 flex flex-col items-center text-slate-600 my-2 justify-center w-full rounded cursor-pointer hover:bg-slate-100 transition duration-500"
                    key={index}
                  >
                    <p>{description.workExperience}</p>
                  </Card>
                ))}
              </>
            )}
          </SimpleBar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

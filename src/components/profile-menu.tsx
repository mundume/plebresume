import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Bot, RefreshCcw } from "lucide-react";
import {
  NotificationSchema,
  PersonalInfomationValues,
} from "@/lib/validators/resume-validator";
import { generateResumeProfile } from "@/app/notyys/actions";
import { Card } from "./ui/card";
import { UseFormReturn } from "react-hook-form";
import SimpleBar from "simplebar-react";
import { useResumeBuilderContext } from "./resume-builder-context";
type Props = {
  form: UseFormReturn<PersonalInfomationValues, any, undefined>;
  skillsForm: UseFormReturn<
    {
      skills: {
        skills: string;
        level: string;
      }[];
    },
    any,
    undefined
  >;
};
const ProfileMenu = ({ form, skillsForm }: Props) => {
  const [pending, startTransition] = useTransition();
  const [generation, setGeneration] = useState<NotificationSchema>();
  const { resume } = useResumeBuilderContext();
  return (
    <div className="absolute top-[-4px] right-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"}>
            <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-purple-500" />{" "}
            play
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[400px]  text-xs flex  overflow-y- items-center justify-center my-auto mx-auto flex-col">
          <SimpleBar autoHide={false} className="max-h-[300px] w-full">
            {generation ? (
              <div className="text-right">
                <Button
                  size={"icon"}
                  className=""
                  onClick={async () => {
                    startTransition(async () => {
                      const { profiles } = await generateResumeProfile({
                        skills: skillsForm.getValues("skills"),
                      });
                      setGeneration(profiles);
                    });
                  }}
                >
                  <RefreshCcw
                    className={
                      pending
                        ? "animate-spin w-4 h-4 text-slate-600"
                        : `w-4 h-4 text-slate-600`
                    }
                  />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col">
                <p className="text-sm mx-4">
                  click on the bot to generate the profile section using AI
                </p>

                <Button
                  size={"sm"}
                  onClick={async () => {
                    startTransition(async () => {
                      const { profiles } = await generateResumeProfile({
                        skills: skillsForm.getValues("skills"),
                      });
                      setGeneration(profiles);
                    });
                  }}
                >
                  <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-purple-500" />{" "}
                  {pending ? "playing..." : "play"}
                </Button>
              </div>
            )}
            <>
              {generation &&
                generation.profiles?.map((n) => (
                  <Card
                    className="p-4 flex flex-col items-center text-slate-600 my-2 justify-center w-full rounded"
                    onClick={() => form.setValue("resume.profile", n.profile)}
                    key={n.profile}
                  >
                    {n.profile}
                  </Card>
                ))}
            </>
          </SimpleBar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;

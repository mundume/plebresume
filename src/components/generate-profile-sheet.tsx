import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NotificationSchema,
  PersonalInfomationValues,
} from "@/lib/validators/resume-validator";
import { useState, useTransition } from "react";
import { UseFormReturn } from "react-hook-form";
import SimpleBar from "simplebar-react";
import { Button } from "./ui/button";
import { generateResumeProfile } from "@/app/actions";
import { Bot, RefreshCcw, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { LottieNotFound } from "./lottie";

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
export const AIprofileSheet = ({ form, skillsForm }: Props) => {
  const [pending, startTransition] = useTransition();
  const [generation, setGeneration] = useState<NotificationSchema>();
  return (
    <div className="absolute top-[-4px] right-0 h-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"sm"}
            className="relative inline-flex  overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full 
            bg-slate-950 px-3 py-1 text-xs  text-slate-300 backdrop-blur-3xl"
            >
              <Sparkles className="w-4 h-4  mr-1.5  text-yellow-400" />
              play
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          className="w-[400px] sm:w-[560px] text-xs h-full flex  overflow-y- items-center justify-center my-auto mx-auto flex-col "
          side={"right"}
        >
          <SheetHeader className="text-center ">
            <SheetTitle className="text-lg text-center mt-4 ">
              AI Profile
            </SheetTitle>
            <SheetDescription className="text-xs text-slate-600">
              click on the bot to generate the profile section using AI
            </SheetDescription>
          </SheetHeader>
          <SimpleBar
            autoHide={false}
            className=" h-full w-full flex items-center justify-center text-xs"
          >
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
            ) : skillsForm.getValues("skills").length > 0 ? (
              <div className=" flex flex-col  items-center justify-center  text-center my-44 gap-4">
                <p className="text-sm mx-4 text-slate-600 ">
                  click on the button below to generate the profile section
                  using AI
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
            ) : (
              <div className=" flex flex-col  items-center justify-center  ">
                <LottieNotFound />
                <p className="text-sm mx-4 text-slate-600 text-center ">
                  add some skills to your resume to generate the profile section
                  using AI{" "}
                </p>
              </div>
            )}
            <>
              {generation &&
                generation.profiles?.map((n) => (
                  <Card
                    className="p-4  flex flex-col items-center text-slate-600 my-2 justify-center w-full rounded cursor-pointer hover:bg-slate-100  transition duration-500 "
                    onClick={() => form.setValue("resume.profile", n.profile)}
                    key={n.profile}
                  >
                    {n.profile}
                  </Card>
                ))}
            </>
          </SimpleBar>
        </SheetContent>
      </Sheet>
    </div>
  );
};

<button className=""></button>;

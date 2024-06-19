import React from "react";
import { useResumeBuilderContext } from "./resume-builder-context";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

function SkillsForm() {
  const { skillsForm } = useResumeBuilderContext();
  const { fields, append, remove } = useFieldArray({
    control: skillsForm.control,
    name: "skills",
  });
  return (
    <div className="w-full space-y-4 py-4 ">
      <div>
        <h1 className="text-2xl font-bold">Skills</h1>
        <p className=" text-sm  text-slate-600">
          add your skills. sin demand kills will help you stand out from the
          crowd
        </p>
      </div>
      <div className="">
        <Form {...skillsForm}>
          <form action="" className="space-y-8">
            {fields.map((field, index) => (
              <Accordion
                type="single"
                collapsible
                className="flex gap-2 items-center accordion"
                key={field.id}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="space-y-4 border p-4 rounded w-full"
                >
                  <AccordionTrigger>
                    {skillsForm.watch(`skills.${index}.name` as any)
                      ? skillsForm.watch(`skills.${index}.name` as any)
                      : "(Not Specified)"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={skillsForm.control}
                      name={`skills.${index}.name` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter skill name"
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your skill name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                      key={field.id}
                    />
                  </AccordionContent>
                </AccordionItem>

                <Button
                  onClick={() => remove(index)}
                  type="button"
                  size={"icon"}
                  className="shadow-none hover:shadow-none hover:bg-transparent  hover:text-blue-400 trash-button "
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </Accordion>
            ))}
            <div className="space-y-2 my-4">
              <Button
                type="button"
                className=" w-full shadow-none bg-primary hover:bg-primary/90 text-white"
                onClick={() =>
                  append({
                    skills: "",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Skill
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SkillsForm;

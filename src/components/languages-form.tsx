import React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  Accordion,
  AccordionContent,
} from "./ui/accordion";
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
import { useResumeBuilderContext } from "./resume-builder-context";
import { useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";

const LanguagesForm = () => {
  const { languageForm } = useResumeBuilderContext();
  const { fields, append, remove } = useFieldArray({
    control: languageForm.control,
    name: "languages",
  });
  return (
    <div className="w-full space-y-4 py-4 ">
      <div>
        <h1 className="text-2xl font-bold">Languages</h1>
        <p className=" text-sm  text-slate-600">add your languages.</p>
      </div>
      <div>
        <Form {...languageForm}>
          <Accordion type="single" collapsible>
            <form action="" className="space-y-8">
              {fields.map((field, index) => (
                <div
                  className="flex gap-2 items-center accordion"
                  key={field.id}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="space-y-4 border p-4 rounded w-full"
                  >
                    <AccordionTrigger>
                      <div className="flex justify-start">
                        {languageForm.watch(
                          `languages.${index}.languages` as any
                        ) ? (
                          <div className="flex flex-col justify-start items-start">
                            <h2 className=" flex-1">
                              {languageForm.watch(
                                `languages.${index}.languages` as any
                              )}
                            </h2>
                            {languageForm.watch(
                              `languages.${index}.level` as any
                            ) && (
                              <p className="text-xs text-slate-500 flex-1 hover:no-underline">
                                {languageForm.watch(
                                  `languages.${index}.level` as any
                                )}{" "}
                                years of experience
                              </p>
                            )}
                          </div>
                        ) : (
                          "Not Specified"
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-4 w-full">
                        <FormField
                          control={languageForm.control}
                          name={`languages.${index}.languages` as any}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Language</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="skill name"
                                  {...field}
                                  className="h-12"
                                />
                              </FormControl>
                              <FormDescription>
                                name of the language
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                          key={field.id}
                        />
                        <FormField
                          control={languageForm.control}
                          name={`languages.${index}.level` as any}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Level</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="level(in years of experience)"
                                  {...field}
                                  className="h-12"
                                />
                              </FormControl>
                              <FormDescription>
                                years of experience
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                          key={field.id}
                        />
                      </div>
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
                </div>
              ))}
              <div className="space-y-2 my-4">
                <Button
                  type="button"
                  variant={"ghost"}
                  className=" w-full"
                  onClick={() =>
                    append({
                      languages: "",
                      level: "",
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add 1 more language
                </Button>
              </div>
            </form>
          </Accordion>
        </Form>
      </div>
    </div>
  );
};

export default LanguagesForm;
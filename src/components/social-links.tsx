import React from "react";
import { useFieldArray } from "react-hook-form";
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

const SocialLinks = () => {
  const { socialLinkForm } = useResumeBuilderContext();
  const { fields, append, remove } = useFieldArray({
    control: socialLinkForm.control,
    name: "socialLinks",
  });
  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="text-2xl font-bold">Social Links</h1>
        <p className=" text-sm  text-slate-600">
          add your relevant social links
        </p>
      </div>
      <div>
        <Form {...socialLinkForm}>
          <form className="space-y-8">
            {fields.map((field, index) => (
              <Accordion
                key={field.id}
                collapsible
                type="single"
                className="flex gap-2 items-center accordion"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className=" border p-4 rounded w-full "
                >
                  <AccordionTrigger>
                    <div className="flex justify-start">
                      {socialLinkForm.watch(
                        `socialLinks.${index}.name` as any
                      ) ? (
                        <div className="flex flex-col justify-start items-start">
                          <h2 className=" flex-1">
                            {socialLinkForm.watch(
                              `socialLinks.${index}.name` as any
                            )}
                          </h2>
                          <p className="text-xs text-slate-500 flex-1 hover:no-underline">
                            {socialLinkForm.watch(
                              `socialLinks.${index}.link` as any
                            )}
                          </p>
                        </div>
                      ) : (
                        "Not Specified"
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="w-full">
                    <div className="flex items-center gap-4 ">
                      <FormField
                        control={socialLinkForm.control}
                        name={`socialLinks.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Social Media</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12" />
                            </FormControl>
                            <FormDescription>
                              Enter your social media name
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={socialLinkForm.control}
                        name={`socialLinks.${index}.link`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12" />
                            </FormControl>
                            <FormDescription>
                              Enter your social media link
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <Button
                  type="button"
                  size="icon"
                  className="trash-button shadow-none hover:shadow-none hover:bg-transparent  hover:text-blue-400"
                  onClick={() => remove(index)}
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
                    link: "",
                    name: "",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Link
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SocialLinks;

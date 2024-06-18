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
import { Plus, Trash } from "lucide-react";

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
          <form action="">
            {fields.map((field, index) => (
              <Accordion
                key={field.id}
                collapsible
                type="single"
                className=" accordion w-full"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="space-y-4 border p-4 rounded flex-1"
                >
                  <AccordionTrigger>
                    <p>{field.name}</p>
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
                    <Button
                      type="button"
                      size="icon"
                      className="trash-button shadow-none hover:shadow-none hover:bg-transparent  hover:text-blue-400"
                      onClick={() => remove(index)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <div className="space-y-2 my-4">
              <Button
                className="w-full "
                onClick={() =>
                  append({
                    name: "",
                    link: "",
                  })
                }
              >
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SocialLinks;

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
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { SocialLinksSchema } from "@/lib/schemas";

const SocialLinks = () => {
  const { socialLinkForm, resumeId, resume } = useResumeBuilderContext();
  const utils = trpc.useUtils();
  const { mutate: addSocialLinks } = trpc.addSocialLinks.useMutation({
    onSuccess: () => {
      toast.success("Saved");
    },
    onMutate: () => {
      toast.loading("Saving...");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
  const { mutate: deleteSocial, isLoading } = trpc.deleteSocialLink.useMutation(
    {
      onMutate: () => {
        toast.loading("Deleting Link...");
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        toast.success("Link Deleted");
        utils.getResume.invalidate();
      },
      onSettled: () => {
        toast.dismiss();
      },
    }
  );
  const onSubmit = (data: SocialLinksSchema) => {
    addSocialLinks({
      resumeId: resumeId,
      socialLinks: {
        socialLinks: data.socialLinks,
      },
    });
  };

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
          <Accordion type="single" collapsible>
            <form
              className="space-y-8"
              onSubmit={socialLinkForm.handleSubmit(onSubmit)}
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
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
                    onClick={() => {
                      if (resume?.socialLinks[index]?.id) {
                        deleteSocial({
                          id: resume.socialLinks[index].id,
                        });
                      } else {
                        remove(index);
                      }
                    }}
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
                      link: "",
                      name: "",
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add 1 more link
                </Button>
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </Accordion>
        </Form>
      </div>
    </div>
  );
};

export default SocialLinks;

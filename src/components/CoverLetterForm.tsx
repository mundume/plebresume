import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Bot, Loader, Pencil, Repeat } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CoverLetterFormSchema } from "@/lib/validators/coverlettervalidator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useResumeContext } from "./Provider";

type Props = {
  response: string;
};
const CoverLetterForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    generateCoverLetter,
    formValues,
    setFormValues,
    isLoading,
    response,
  } = useResumeContext();

  const form = useForm<z.infer<typeof CoverLetterFormSchema>>({
    resolver: zodResolver(CoverLetterFormSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
    },
  });
  const onSubmit = () => {
    generateCoverLetter();
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          variant={response ? "outline" : "default"}
          size={response ? "icon" : "default"}
        >
          {response ? (
            <>
              <Pencil className="w-4 h-4 hover:shadow-2xl text-slate-600" />{" "}
            </>
          ) : (
            <>
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 text-purple-500 animate-spin" />
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-purple-500" />
                  play
                </>
              )}
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-md max-h-[90vh]">
        <Form {...form} control={form.control}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({}) => (
                <>
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...(form.register("jobTitle"), { required: true })}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            jobTitle: e.target.value,
                          })
                        }
                        value={formValues.jobTitle}
                      />
                    </FormControl>
                    <FormDescription>Enter your job title</FormDescription>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel className="">Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        value={formValues.jobDescription}
                        rows={10}
                        {...form.register("jobDescription")}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            jobDescription: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Paste the job description here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button
              type="submit"
              onClick={() => !isLoading && setIsOpen(!isOpen)}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterForm;

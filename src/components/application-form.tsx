"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { useCoverLetterContext } from "./Provider";
import { CoverLetterFormSchema } from "@/lib/validators/coverlettervalidator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ApplicationForm = ({ handleSubmit }: { handleSubmit: () => void }) => {
  const { generateCoverLetter, formValues, setFormValues, isLoading } =
    useCoverLetterContext();
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
    <div>
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
            onClick={handleSubmit}
            className="w-full dark:border dark:border-slate-800"
            variant={"pleb"}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { compareAsc, format } from "date-fns";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { SetStateAction, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
  useResumeBuilderContext,
  type Action,
  type WorKexperience,
} from "./resume-builder-context";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import { index } from "drizzle-orm/sqlite-core";
import { EmploymentSchema, FormSchema, employmentSchema } from "@/lib/schemas";

type ExperienceProps = {
  values: WorKexperience;
  dispatch: React.Dispatch<Action>;
  currentValues: {
    companyName: string;
    title: string;
    description: string;
    startDate: Date | string;
    endDate?: Date | undefined | string;
    currentlyWorking?: boolean | undefined;
  };
  setCurrentValues: React.Dispatch<
    SetStateAction<
      {
        companyName: string;
        title: string;
        description: string;
        startDate: Date | string;
        endDate?: Date | undefined | string;
        currentlyWorking?: boolean | undefined;
      }[]
    >
  >;
};

export default function AddExperience({
  values,
  dispatch,
  currentValues,
  setCurrentValues,
}: ExperienceProps) {
  const { form } = useResumeBuilderContext();
  function onSubmit(data: EmploymentSchema) {
    console.log("fields");

    console.log(data);

    toast(`${JSON.stringify(data, null, 2)}`);
    dispatch({
      type: "ADD_WORK_EXPERIENCES",
      payload: data,
    });
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  console.log(form.watch("experience"));

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`experience.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter title"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.companyName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <ForwardRefEditor
                        markdown={field.value || ""}
                        {...field}
                        className="prose"
                        onChange={(e) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between gap-2">
                <FormField
                  control={form.control}
                  name={`experience.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MMMM/yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please select the start date.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={form.watch(
                                `experience.${index}.currentlyWorking`
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MMMM/yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please select the end date.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`experience.${index}.currentlyWorking`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <div className="space-y-1 leading-none">
                      <FormLabel>Currently Working</FormLabel>
                      <FormDescription>
                        Check if you are currently working at this job.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button type="submit">Submit</Button>
          <Button
            type="button"
            onClick={() =>
              append({
                companyName: "",
                description: "",
                startDate: new Date(),
                title: "",
                endDate: undefined,
                currentlyWorking: false,
              })
            }
          >
            Add one employment
          </Button>
          {/* @ts-ignore */}
          <Button
            type="button"
            onClick={() => remove(index)}
            variant={"destructive"}
          >
            remove
          </Button>
        </form>
      </Form>
      <div className="mt-8">
        <h2 className="text-lg font-bold">Live Preview</h2>
      </div>
    </Card>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SetStateAction, useState } from "react";

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
import type { Action, WorKexperience } from "./resume-builder-context";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ForwardRefEditor } from "./ForwardedRefEditor";

const FormSchema = z.object({
  companyName: z.string({ required_error: "Company name is required" }),
  title: z.string({
    required_error: "Job title is required",
  }),
  description: z.string(),
  startDate: z.date({
    required_error: "To get the timeline, start date is required",
  }),
  endDate: z.date({}).optional(),
  currentlyWorking: z.boolean().default(false).optional(),
});

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
    SetStateAction<{
      companyName: string;
      title: string;
      description: string;
      startDate: Date | string;
      endDate?: Date | undefined | string;
      currentlyWorking?: boolean | undefined;
    }>
  >;
};

export default function AddExperience({ values, dispatch }: ExperienceProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [currentValues, setCurrentValues] = useState(form.getValues());

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedExperienceData = {
      ...data,
      startDate: format(data.startDate, "MMMM/yyyy"),
      endDate: data.currentlyWorking
        ? "Present"
        : format(data.endDate!, "MMMM/yyyy"),
    };
    console.log(data);
    toast(`${JSON.stringify(data, null, 2)}`);
    dispatch({
      type: "ADD_WORK_EXPERIENCES",
      payload: [formattedExperienceData],
    });
  }

  function handleFormChange() {
    setCurrentValues(form.getValues());
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={handleFormChange}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Job title"
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
            name="companyName"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <ForwardRefEditor markdown={field.value || ""} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-2">
            <FormField
              control={form.control}
              name="startDate"
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
              name="endDate"
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
                          disabled={form.watch("currentlyWorking")}
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
                  <FormDescription>Please select the end date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="currentlyWorking"
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="mt-8">
        <h2 className="text-lg font-bold">Live Preview</h2>
        <pre>{JSON.stringify(currentValues, null, 2)}</pre>
      </div>
    </Card>
  );
}

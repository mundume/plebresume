"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { UseFormStateReturn, useForm } from "react-hook-form";
import { z } from "zod";

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
import { DatePickerDemo } from "./datepicker";

const FormSchema = z.object({
  companyName: z.string({ required_error: "porn star" }),
  title: z.string({
    required_error: "job title is required",
  }),
  description: z.string(),
  startDate: z.date({
    required_error: "to get the timeline, start date is required",
  }),
  endDate: z.date({
    required_error: "to get the timeline, end date is required",
  }),
});
type ExperienceProps = {
  values: WorKexperience;
  dispatch: React.Dispatch<Action>;
};

export default function AddExperience({ values, dispatch }: ExperienceProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      ...data,
      startDate: data.startDate.toISOString(), // Example date formatting
      endDate: data.endDate.toISOString(), // Example date formatting
    };
    console.log(data);
    toast(`${JSON.stringify(data, null, 2)}`);
    dispatch({
      type: "ADD_WORK_EXPERIENCES",

      payload: [formattedData],
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="enter company name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>start Date</FormLabel>
              <FormControl>
                <DatePickerDemo value={field.value} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>end date</FormLabel>
              <FormControl>
                <DatePickerDemo value={field.value} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const CustomFormItem = ({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description: string;
}) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>{children}</FormControl>
    <FormDescription>{description}</FormDescription>
  </FormItem>
);

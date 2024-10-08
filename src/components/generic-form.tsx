import {
  useFieldArray,
  UseFormReturn,
  FieldValues,
  Path,
} from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ForwardRefEditor } from "./ForwardedRefEditor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon, Trash2 } from "lucide-react";
import { useResumeBuilderContext } from "./resume-builder-context";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { generateWorkexperience } from "@/app/actions";
import { WorkExperienceSelect } from "./work-experience-select";
import { EducationSelect } from "./education-select";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  value: any;
  onSubmit: (data: T) => void;
  values: {
    name: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    currently: string;
  };
}

type Description = {
  workExperience: string;
};
const GenericForm = <T extends FieldValues>({
  form,
  value,
  onSubmit,
  values,
}: Props<T>) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: value as any,
  });

  const { resume, resumeId } = useResumeBuilderContext();
  const utils = trpc.useUtils();

  const { mutate: deleteWork, isLoading: isDeleting } =
    trpc.deleteWorkExperience.useMutation({
      onMutate: () => {
        toast.loading("Deleting...");
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Deleted");
        utils.getResume.invalidate();
      },
      onSettled: () => {
        toast.dismiss();
      },
    });
  const { mutate: deleteEducation } = trpc.deleteEducation.useMutation({
    onMutate: () => {
      toast.loading("Deleting...");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Deleted");
      utils.getResume.invalidate();
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const deleteEntity = (index: number) => {
    if (resume?.workExperience[index]?.id) {
      deleteWork({
        id: resume?.workExperience[index].id as string,
      });
    } else if (resume?.education[index]?.id) {
      deleteEducation({
        id: resume?.education[index].id as string,
      });
    } else {
      remove(index);
    }
  };

  return (
    <Card className="rounded border-none shadow-none">
      <Form {...form}>
        <Accordion type="single" collapsible className="">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col gap-2 items-center accordion relative"
              >
                <Button
                  type="button"
                  size="icon"
                  className=" mt-2  self-end text-white md:hidden"
                  onClick={() => deleteEntity(index)}
                >
                  <Trash2 className="w-4 h-4 text-slate-600" />
                </Button>
                <AccordionItem
                  value={`item-${index}`}
                  className="space-y-4 border p-4 rounded w-full"
                >
                  <AccordionTrigger>
                    {form.watch(`${value}.${index}.title` as Path<T>)
                      ? `${form.watch(`${value}.${index}.title` as Path<T>)} ${
                          form.watch(`${value}.${index}.name` as Path<T>) &&
                          "at"
                        } ${form.watch(`${value}.${index}.name` as Path<T>)}`
                      : "Not Specified"}
                  </AccordionTrigger>
                  <AccordionContent className="border-none">
                    <div className="my-4 space-y-4">
                      <div className="flex justify-between items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`${value}.${index}.title` as Path<T>}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>{values.title}</FormLabel>
                              <FormControl>
                                <Input
                                  className="rounded"
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
                          name={`${value}.${index}.name` as Path<T>}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>{values.name}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder=""
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`${value}.${index}.location` as Path<T>}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{values.location}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter location"
                                {...field}
                                value={field?.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`${value}.${index}.description` as Path<T>}
                        render={({ field }) => (
                          <FormItem className="relative  ">
                            {value === "experience" ? (
                              <div
                                className="
                                prose bg-white no-break-inside
                              "
                              >
                                <WorkExperienceSelect
                                  input={form.getValues(
                                    `${value}.${index}.title` as Path<T>
                                  )}
                                  // @ts-ignore
                                  form={form}
                                  index={index}
                                />
                              </div>
                            ) : value === "education" ? (
                              <div className="prose bg-white no-break-inside">
                                <EducationSelect
                                  input={form.getValues(
                                    `${value}.${index}.title` as Path<T>
                                  )}
                                  // @ts-ignore
                                  form={form}
                                  index={index}
                                />
                              </div>
                            ) : null}
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <>
                                <ForwardRefEditor
                                  {...field}
                                  contentEditableClassName="prose markdown bg-white no-break-inside bg text-sm"
                                  onChange={(newValue) => {
                                    field.onChange(newValue);
                                  }}
                                  markdown={field.value || "hello"}
                                  value={field.value || "hello"}
                                  key={`${value}.${index}.description`}
                                />
                              </>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <FormField
                          control={form.control}
                          name={`${value}.${index}.startDate` as Path<T>}
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
                                        format(
                                          new Date(field.value),
                                          "MMMM/yyyy"
                                        )
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={new Date(field.value)}
                                    onSelect={(date) => field.onChange(date)}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
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
                          name={`${value}.${index}.endDate` as Path<T>}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>{values.endDate}</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                      disabled={form.watch(
                                        `${value}.${index}.currently` as Path<T>
                                      )}
                                    >
                                      {field.value ? (
                                        format(
                                          new Date(field.value),
                                          "MMMM/yyyy"
                                        )
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={new Date(field.value)}
                                    onSelect={(date) => field.onChange(date)}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
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
                        name={`${value}.${index}.currently` as Path<T>}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 rounded-md shadow">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>

                            <div className="space-y-1 leading-none">
                              <FormLabel>{values.currently}</FormLabel>
                              <FormDescription>
                                Check if you are {values.currently}.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <Button
                  type="button"
                  size="icon"
                  className="absolute top-4 right-4 trash-button shadow-none hover:shadow-none hover:bg-transparent hover:text-blue-400 hidden md:flex"
                  onClick={() => deleteEntity(index)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
            <div className="flex flex-col items-center justify-between gap-4">
              <Button
                type="button"
                variant={"ghost"}
                className="w-full"
                onClick={() =>
                  // @ts-ignore
                  append({
                    ...form.getValues(),
                  })
                }
              >
                <PlusIcon className="w-5 h-5 mr-2" /> Add 1 more {value}
              </Button>
              {resume?.workExperience[0] && value === "experience" ? (
                <Button className="w-full">Update work experience</Button>
              ) : resume?.education[0] && value === "education" ? (
                <Button className="w-full">Update Education</Button>
              ) : (
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Accordion>
      </Form>
    </Card>
  );
};

export default GenericForm;

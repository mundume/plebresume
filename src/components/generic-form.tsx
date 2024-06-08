import React from "react";
import { z, ZodSchema } from "zod";
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
import { EmploymentSchema } from "@/lib/schemas";

type Props<T extends FieldValues> = {
  schema: ZodSchema;
  form: UseFormReturn<T>;
  value: keyof EmploymentSchema;
  onSubmit: (data: T) => void;
  values: {
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    currentlyStudying: string;
  };
};

const GenericForm = <T extends FieldValues>({
  schema,
  form,
  value,
  onSubmit,
  values,
}: Props<T>) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: value as any,
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`${value}.${index}.title` as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{values.degree}</FormLabel>
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
                name={`${value}.${index}.companyName` as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{values.school}</FormLabel>
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
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <ForwardRefEditor
                        {...field}
                        onChange={field.onChange}
                        markdown={field.value || "your description here"}
                      />
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
                                format(new Date(field.value), "MMMM/yyyy")
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
                            selected={new Date(field.value)}
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
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
                  name={`${value}.${index}.endDate` as Path<T>}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{field.name}</FormLabel>
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
                                `${value}.${index}.currentlyWorking` as Path<T>
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "MMMM/yyyy")
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
                            selected={new Date(field.value)}
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
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
                name={`${value}.${index}.currentlyWorking` as Path<T>}
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
              <Button
                type="button"
                onClick={() => remove(index)}
                variant={"destructive"}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => append()}>
            Add one employment
          </Button>
        </form>
      </Form>
      <div className="mt-8">
        <h2 className="text-lg font-bold">Live Preview</h2>
      </div>
    </Card>
  );
};

export default GenericForm;

import {
  useFieldArray,
  UseFormReturn,
  FieldValues,
  Path,
  UseControllerProps,
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
import { Plus, PlusIcon, Trash, Trash2 } from "lucide-react";

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

  return (
    <Card className="rounded border-none shadow-none">
      <Form {...form}>
        <Accordion type="single" collapsible className="">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center accordion">
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
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <ForwardRefEditor
                                {...field}
                                onChange={field.onChange}
                                markdown={
                                  field.value || "your description here"
                                }
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
                                    onSelect={(date) =>
                                      field.onChange(date?.toISOString())
                                    }
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
                                    onSelect={(date) =>
                                      field.onChange(date?.toISOString())
                                    }
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
                  className="trash-button shadow-none hover:shadow-none hover:bg-transparent  hover:text-blue-400"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
            <div className="flex flex-col items-center justify-between gap-4">
              <Button
                type="button"
                className="w-full shadow-none bg-primary hover:bg-primary/90 text-white"
                onClick={() =>
                  append({
                    ...form.getValues(),
                  })
                }
              >
                <PlusIcon className="w-5 h-5 mr-2" /> Add More
              </Button>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Accordion>
      </Form>
    </Card>
  );
};

export default GenericForm;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
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

const CoverLetterForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof CoverLetterFormSchema>>({
    resolver: zodResolver(CoverLetterFormSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CoverLetterFormSchema>) => {
    console.log(values);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-yellow-400" />
          Generate Cover letter
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form} control={form.control}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...form.register("jobTitle")} />
                    </FormControl>
                    <FormDescription>Enter your job title</FormDescription>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        {...form.register("jobDescription")}
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterForm;

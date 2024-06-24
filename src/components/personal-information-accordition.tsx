import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  PersonalInfomationValues,
  resumeSchema,
} from "@/lib/validators/resume-validator";
import {
  Action,
  AddPersonalInformation,
  useResumeBuilderContext,
} from "./resume-builder-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { db } from "@/config/prisma";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { z } from "zod";

type InformationAccordition = {
  values: PersonalInfomationValues;
  dispatch: React.Dispatch<AddPersonalInformation>;
};
const PersonalInformationAccordition = ({
  values,
  dispatch,
}: InformationAccordition) => {
  const { personalInfoForm: form } = useResumeBuilderContext();
  const onSubmit = (data: z.infer<typeof resumeSchema>) => {
    console.log(data);
  };
  return (
    <Card className=" border-none shadow-none ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between gap-2 pt-3">
            <FormField
              control={form.control}
              name="resume.names.firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
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
              name="resume.names.lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
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
          </div>
          <FormField
            control={form.control}
            name="resume.profile"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Profile</FormLabel>
                <FormControl>
                  <Textarea
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
            name="resume.proffession"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Proffession</FormLabel>
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
            name="resume.email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
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
          <div className="flex items-center justify-between gap-2    ">
            <FormField
              control={form.control}
              name="resume.address.city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
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
              name="resume.address.state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="resume.phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
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
        </form>
      </Form>
    </Card>
  );
};

export default PersonalInformationAccordition;

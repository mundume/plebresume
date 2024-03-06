import {
  resumeSchema,
  workExperience,
  type WorkExperienceValues,
} from "@/lib/validators/resume-validator";
import React from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Action, WorKexperience } from "./resume-builder-context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { register } from "module";

type SkillsProps = {
  values: WorKexperience;
  dispatch: React.Dispatch<Action>;
};
const AddExperience = ({ values, dispatch }: SkillsProps) => {
  const form = useForm<WorkExperienceValues>({});

  return (
    <Card>
      <Form {...form} control={form.control}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log({
              ...data,
            });
            dispatch({ type: "ADD_WORK_EXPERIENCES", payload: [data] });
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="shadcn"
                    {...field}
                    {...(form.register("companyName"), { required: true })}
                    value={field.value}
                  />
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="shadcn"
                    {...field}
                    {...(form.register("companyName"), { required: true })}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit">pleb</button>
        </form>
      </Form>
    </Card>
  );
};

export default AddExperience;

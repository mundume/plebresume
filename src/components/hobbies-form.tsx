import React from "react";
import { useResumeBuilderContext } from "./resume-builder-context";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const HobbiesForm = () => {
  const { hobbiesForm } = useResumeBuilderContext();
  return (
    <div className="space-y-4 py-4">
      <div className="">
        <h1 className="text-2xl font-bold">Hobbies</h1>
        <p className=" text-sm  text-slate-600">
          What are some of your hobbies? What do you enjoy doing?
        </p>
      </div>
      <div>
        <Form {...hobbiesForm}>
          <FormField
            control={hobbiesForm.control}
            name="hobbies"
            render={({ field }) => <Textarea {...field} />}
          />
        </Form>
      </div>
    </div>
  );
};

export default HobbiesForm;

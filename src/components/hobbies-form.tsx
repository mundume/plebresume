import React from "react";
import { useResumeBuilderContext } from "./resume-builder-context";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { HobbiesFormSchema } from "@/lib/schemas";
import { Button } from "./ui/button";

const HobbiesForm = () => {
  const { hobbiesForm, resumeId } = useResumeBuilderContext();
  const { mutate: addHobbies } = trpc.addHobbies.useMutation({
    onSuccess: (data) => {
      toast.success("Hobbies added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
    onMutate: () => {
      toast.loading("Saving...");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
  const onSubmit = (data: HobbiesFormSchema) => {
    addHobbies({
      resumeId: resumeId,
      hobbies: {
        hobbies: data.hobbies,
      },
    });
  };
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
          <form
            action=""
            onSubmit={hobbiesForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={hobbiesForm.control}
              name="hobbies"
              render={({ field }) => <Textarea {...field} />}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HobbiesForm;

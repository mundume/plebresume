import React from "react";
import GenericForm from "./generic-form";
import { EducationFormSchema, employmentSchema } from "@/lib/schemas";
import { useResumeBuilderContext } from "./resume-builder-context";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

export default function AddExperienceForm() {
  const { form, resumeId } = useResumeBuilderContext();
  const {
    mutate: updateResumeWorkExperience,
    isLoading,
    data,
  } = trpc.updateResumeWorkExperience.useMutation({
    onMutate: () => {
      toast.loading("Saving...");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
    onSuccess: () => {
      toast.success("Saved");
    },
    onSettled: (data) => {
      console.log(data);
      toast.dismiss();
    },
  });
  const values = {
    name: "Employer",
    title: "Job Title",
    location: "City",
    description: "Description",
    startDate: "Start Date",
    endDate: "End Date",
    currently: "Currently Working",
  };
  const onSubmit = () => {
    form.handleSubmit((data) => {
      console.log(data);
      updateResumeWorkExperience({
        resumeId: resumeId,
        workExperience: data,
      });
    })();
  };
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Work Experience</h1>
        <p className=" text-sm  text-slate-600">
          add your relevant work experience(previous 10 years). Use bullet
          points to list your achievements.
        </p>
      </div>
      <GenericForm
        form={form}
        onSubmit={onSubmit}
        value={"experience"}
        values={values}
      />
    </div>
  );
}

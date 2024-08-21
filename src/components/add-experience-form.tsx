import React from "react";
import GenericForm from "./generic-form";
import { EducationFormSchema, employmentSchema } from "@/lib/schemas";
import { useResumeBuilderContext } from "./resume-builder-context";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

export default function AddExperienceForm() {
  const { form, resumeId } = useResumeBuilderContext();
  const {
    mutate: addWorkExperience,
    isLoading,
    data,
  } = trpc.addWorkExperience.useMutation({
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
      const formattedData = data.experience.map((experience) => ({
        ...experience,
        startDate: experience.startDate
          ? new Date(experience.startDate)
          : undefined,
        endDate: experience.endDate ? new Date(experience.endDate) : undefined,
      }));
      addWorkExperience({
        resumeId: resumeId,
        workExperience: {
          experience: formattedData,
        },
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

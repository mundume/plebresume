import React from "react";
import GenericForm from "./generic-form";
import { EducationFormSchema, employmentSchema } from "@/lib/schemas";
import { useResumeBuilderContext } from "./resume-builder-context";
import { db } from "@/config/prisma";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

function EducationForm() {
  const { dispatch, educationForm, userId, resumeId } =
    useResumeBuilderContext();

  const { mutate: addEducation, error } = trpc.addEducation.useMutation({
    onSuccess: () => {
      toast.success("Education added successfully");
    },

    onSettled: () => {
      toast.dismiss();
    },

    onMutate: () => {
      toast.loading("Saving...");
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });
  const values = {
    name: "School Name",
    title: "Degree",
    description: "Description",
    location: "City",
    startDate: "Start Date",
    endDate: "End Date",
    currently: "Currently Attending",
  };

  const onSubmit = () => {
    educationForm.handleSubmit((data) => {
      const formattedData = data.education.map((education) => ({
        ...education,
        startDate: education.startDate
          ? new Date(education.startDate)
          : undefined,
        endDate: education.endDate ? new Date(education.endDate) : undefined,
      }));

      addEducation({
        resumeId,
        education: {
          education: formattedData,
        },
      });
    })();
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Education</h1>
        <p className=" text-sm  text-slate-600">
          a great education background will make you stand out from the masses
        </p>
      </div>
      <GenericForm
        form={educationForm}
        onSubmit={onSubmit}
        value={"education"}
        values={values}
      />
    </div>
  );
}

export default EducationForm;

import React from "react";
import GenericForm from "./generic-form";
import { EducationFormSchema, employmentSchema } from "@/lib/schemas";
import { useResumeBuilderContext } from "./resume-builder-context";

export default function AddExperienceForm() {
  const { form } = useResumeBuilderContext();
  const values = {
    name: "Employer",
    title: "Job Title",
    location: "City",
    description: "Description",
    startDate: "Start Date",
    endDate: "End Date",
    currently: "Currently Working",
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
        onSubmit={() => {}}
        value={"experience"}
        values={values}
      />
    </div>
  );
}

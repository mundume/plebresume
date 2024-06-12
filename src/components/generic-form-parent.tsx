import React from "react";
import GenericForm from "./generic-form";
import { EducationFormSchema, employmentSchema } from "@/lib/schemas";
import { useResumeBuilderContext } from "./resume-builder-context";

function GenericFormParent() {
  const { form, dispatch, educationForm } = useResumeBuilderContext();
  const values = {
    degree: "Degree",
    school: "School",
    location: "Location",
    startDate: "Start Date",
    endDate: "End Date",
    currentlyStudying: "Currently Studying",
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
        onSubmit={() => {}}
        value={"education"}
        values={values}
      />
    </div>
  );
}

export default GenericFormParent;

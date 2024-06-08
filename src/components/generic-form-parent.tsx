import React from "react";
import GenericForm from "./generic-form";
import { EducationFormSchema, employmentSchema } from "@/lib/schemas";
import { useResumeBuilderContext } from "./resume-builder-context";

function GenericFormParent() {
  const { form, dispatch } = useResumeBuilderContext();
  const values = {
    degree: "Degree",
    school: "School",
    location: "Location",
    startDate: "Start Date",
    endDate: "End Date",
    currentlyStudying: "Currently Studying",
  };

  return (
    <>
      <GenericForm
        form={form}
        schema={employmentSchema}
        onSubmit={() => {}}
        value={"experience"}
        values={values}
      />
    </>
  );
}

export default GenericFormParent;

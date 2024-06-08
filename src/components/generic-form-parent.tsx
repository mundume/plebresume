import React from "react";
import GenericForm from "./generic-form";
import { employmentSchema } from "@/lib/schemas";
import { useResumeBuilderContext } from "./resume-builder-context";

function GenericFormParent() {
  const { form, dispatch } = useResumeBuilderContext();

  return (
    <>
      <GenericForm
        form={form}
        schema={employmentSchema}
        onSubmit={() => {}}
        value="experience"
      />
    </>
  );
}

export default GenericFormParent;

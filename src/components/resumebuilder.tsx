"use client";

import React from "react";
import { Input } from "./ui/input";
import { useResumeBuilderContext } from "./resume-builder-context";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();
  return (
    <div>
      <Input
        value={values.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
    </div>
  );
};

export default ResumeBuilder;

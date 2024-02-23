"use client";

import React from "react";
import { Input } from "./ui/input";
import { useResumeBuilderContext } from "./resume-builder-context";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();
  return (
    <div>
      <Input
        value={values.email}
        onChange={(e) => {
          dispatch({
            type: "ADD_EMAIL",
            payload: { email: e.target.value },
          });
        }}
      />
      <Input
        value={values.name}
        onChange={(e) =>
          dispatch({
            type: "ADD_NAME",
            payload: { name: e.target.value },
          })
        }
      />
    </div>
  );
};

export default ResumeBuilder;

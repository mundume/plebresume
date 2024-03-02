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
          dispatch({
            type: "ADD_PERSONAL_INFORMATION",
            payload: { name: e.target.value },
          })
        }
      />
      <Input
        value={values.email}
        onChange={(e) =>
          dispatch({
            type: "ADD_PERSONAL_INFORMATION",
            payload: { email: e.target.value },
          })
        }
      />
    </div>
  );
};

export default ResumeBuilder;

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
      <Input
        value={values.phone}
        onChange={(e) =>
          dispatch({
            type: "ADD_PERSONAL_INFORMATION",
            payload: { phone: e.target.value },
          })
        }
      />
      <div className="flex gap-2">
        <Input
          value={values.address.city}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: { address: { city: e.target.value } },
            })
          }
        />
        <Input
          value={values.address.state}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: {
                address: { state: e.target.value },
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;

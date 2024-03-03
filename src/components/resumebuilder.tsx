"use client";

import React from "react";
import { Input } from "./ui/input";
import { useResumeBuilderContext } from "./resume-builder-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resumeSchema } from "@/lib/validators/resume-validator";

const ResumeBuilder = () => {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof resumeSchema>
  >({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: "nzai",
      email: "",
      phone: "",
      address: {
        city: "",
        state: "",
      },
    },
  });

  const { values, dispatch } = useResumeBuilderContext();

  const { name, email, phone, address } = values;
  return (
    <div>
      <Input
        value={name}
        {...register("name", { required: true })}
        onChange={(e) =>
          dispatch({
            type: "ADD_PERSONAL_INFORMATION",
            payload: { name: e.target.value },
          })
        }
      />
      <Input
        value={email}
        {...(register("email"), { required: true })}
        type="email"
        onChange={(e) =>
          dispatch({
            type: "ADD_PERSONAL_INFORMATION",
            payload: { email: e.target.value },
          })
        }
      />
      <Input
        value={phone}
        {...register("phone")}
        onChange={(e) =>
          dispatch({
            type: "ADD_PERSONAL_INFORMATION",
            payload: { phone: e.target.value },
          })
        }
      />
      <div className="flex gap-2">
        <Input
          value={address.city}
          {...register("address.city")}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: { address: { city: e.target.value } },
            })
          }
        />
        <Input
          value={address.state}
          {...register("address.state")}
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

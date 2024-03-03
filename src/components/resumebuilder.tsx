"use client";

import React from "react";
import { Input } from "./ui/input";
import { useResumeBuilderContext } from "./resume-builder-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resumeSchema } from "@/lib/validators/resume-validator";
import PersonalInfoAccordition from "./personal-info-accordition";

const ResumeBuilder = () => {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof resumeSchema>
  >({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      names: {
        firstName: "",
        lastName: "",
      },
      email: "",
      phone: "",
      address: {
        city: "",
        state: "",
      },
    },
  });

  const { values, dispatch } = useResumeBuilderContext();

  const { names, email, phone, address } = values.personalInfo;
  const { firstName, lastName } = names;
  return (
    <div>
      <PersonalInfoAccordition />
      <div className="flex gap-2">
        <Input
          value={firstName}
          {...register("names.firstName", { required: true })}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: { names: { firstName: e.target.value } },
            })
          }
        />
        <Input
          value={lastName}
          {...register("names.lastName", { required: true })}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: { names: { lastName: e.target.value } },
            })
          }
        />
      </div>

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

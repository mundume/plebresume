"use client";

import React from "react";
import { Input } from "./ui/input";
import { useResumeBuilderContext } from "./resume-builder-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resumeSchema } from "@/lib/validators/resume-validator";
import ResumeInfoAccordition from "./resume-info-accordition";

const ResumeBuilder = () => {
  const { values, dispatch } = useResumeBuilderContext();

  return (
    <>
      <div>
        <ResumeInfoAccordition
          values={values.personalInfo}
          dispatch={dispatch}
        />
      </div>
      <div></div>
    </>
  );
};

export default ResumeBuilder;

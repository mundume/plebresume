import {
  workExperience,
  type WorkExperienceValues,
} from "@/lib/validators/resume-validator";
import React from "react";
import { type AddWorkExperience } from "./resume-builder-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type SkillsProps = {
  values: WorkExperienceValues;
  dispatch: React.Dispatch<AddWorkExperience>;
};
const AddExperience = ({ values, dispatch }: SkillsProps) => {
  const { companyName, description, endDate, startDate, title } = values;

  const { register, handleSubmit, formState } = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperience),
    defaultValues: {
      companyName: "",
      description: "",
      endDate: "",
      startDate: "",
      title: "",
    },
  });
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-2 py-2">
        <div className="grid gap-1">
          <Label htmlFor="company name" className="text-xs text-slate-600">
            company name
          </Label>
          <Input
            placeholder="company name"
            value={companyName}
            {...register("companyName", { required: true })}
            onChange={(e) =>
              dispatch({
                type: "ADD_WORK_EXPERIENCE",
                payload: { workExperience: { companyName: e.target.value } },
              })
            }
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="jobtitle" className="text-xs text-slate-600">
            job title
          </Label>
          <Input
            value={title}
            placeholder="job title"
            {...register("title", { required: true })}
            onChange={(e) =>
              dispatch({
                type: "ADD_WORK_EXPERIENCE",
                payload: { workExperience: { title: e.target.value } },
              })
            }
          />
        </div>
      </div>
      <div className="grid gap-1 py-2 ">
        <Label htmlFor="description" className="text-xs text-slate-600">
          description
        </Label>
        <Textarea
          placeholder="description"
          value={description}
          {...(register("description"), { required: true })}
          onChange={(e) =>
            dispatch({
              type: "ADD_WORK_EXPERIENCE",
              payload: { workExperience: { description: e.target.value } },
            })
          }
        />
      </div>
    </Card>
  );
};

export default AddExperience;

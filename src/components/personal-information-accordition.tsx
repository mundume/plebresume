import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  PersonalInfomationValues,
  resumeSchema,
} from "@/lib/validators/resume-validator";
import { Action, AddPersonalInformation } from "./resume-builder-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type InformationAccordition = {
  values: PersonalInfomationValues;
  dispatch: React.Dispatch<AddPersonalInformation>;
};
const PersonalInformationAccordition = ({
  values,
  dispatch,
}: InformationAccordition) => {
  const { names, email, phone, address, profile, proffession } = values;
  const { firstName, lastName } = names;
  const { register, handleSubmit, formState } =
    useForm<PersonalInfomationValues>({
      resolver: zodResolver(resumeSchema),
      defaultValues: {
        names: {
          firstName: "",
          lastName: "",
        },
        email: "",
        profile: "",
        proffession: "",
        phone: "",
        address: {
          city: "",
          state: "",
        },
      },
    });
  return (
    <Card className=" border-none shadow-none">
      <div className="flex items-center justify-between gap-2 pt-3">
        <div className="grid gap-1 w-full">
          <Label htmlFor="first name" className="text-xs text-slate-600">
            first name
          </Label>
          <Input
            placeholder="first name"
            className=""
            value={firstName}
            {...register("names.firstName", { required: true })}
            onChange={(e) =>
              dispatch({
                type: "ADD_PERSONAL_INFORMATION",
                payload: { names: { firstName: e.target.value } },
              })
            }
          />
        </div>
        <div className="grid gap-1 w-full">
          <Label htmlFor="last name" className="text-xs text-slate-600">
            last name
          </Label>
          <Input
            className=""
            value={lastName}
            placeholder="last name"
            {...register("names.lastName", { required: true })}
            onChange={(e) =>
              dispatch({
                type: "ADD_PERSONAL_INFORMATION",
                payload: { names: { lastName: e.target.value } },
              })
            }
          />
        </div>
      </div>
      <div className="grid gap-1 pt-3">
        <Label htmlFor="last name" className="text-xs text-slate-600">
          Wanted Job Title
        </Label>
        <Input
          value={proffession}
          placeholder="Your proffession"
          {...register("proffession", { required: true })}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: { proffession: e.target.value },
            })
          }
        />
      </div>
      <div className="grid gap-1 pt-3 ">
        <Label htmlFor="email" className="text-xs text-slate-600">
          email
        </Label>
        <Input
          placeholder="email"
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
      </div>
      <div className="grid gap-1 pt-3">
        <Label htmlFor="phone" className="text-xs text-slate-600">
          phone
        </Label>

        <Input
          value={phone}
          placeholder="phone"
          {...register("phone")}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: { phone: e.target.value },
            })
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2 pt-3">
        <div className="grid gap-1 w-full">
          <Label htmlFor="city" className="text-xs text-slate-600">
            city
          </Label>
          <Input
            value={address.city}
            placeholder="city"
            {...register("address.city")}
            onChange={(e) =>
              dispatch({
                type: "ADD_PERSONAL_INFORMATION",
                payload: { address: { city: e.target.value } },
              })
            }
          />
        </div>
        <div className="grid gap-1 w-full">
          <Label htmlFor="state" className="text-xs text-slate-600">
            state
          </Label>
          <Input
            value={address.state}
            placeholder="state"
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
      <div className="grid gap-1 py-6">
        <Label htmlFor="profile" className="text-xs text-slate-600">
          profile
        </Label>
        <Textarea
          className="py-6"
          value={profile}
          placeholder="profile"
          {...register("profile")}
          onChange={(e) =>
            dispatch({
              type: "ADD_PERSONAL_INFORMATION",
              payload: { profile: e.target.value },
            })
          }
        />
      </div>
    </Card>
  );
};

export default PersonalInformationAccordition;

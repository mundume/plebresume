import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  PersonalInfomationValues,
  resumeSchema,
} from "@/lib/validators/resume-validator";
import { AddPersonalInformation } from "./resume-builder-context";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const PersonalInfoAccordition = ({
  values,
  dispatch,
}: {
  values: PersonalInfomationValues;
  dispatch: React.Dispatch<AddPersonalInformation>;
}) => {
  const { names, email, phone, address, profile } = values;
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
        phone: "",
        address: {
          city: "",
          state: "",
        },
      },
    });
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="font-semibold lg:text-xl"
            icon={
              <Button
                size="icon"
                variant={"pleb"}
                className="dark:border border-slate-800"
              >
                <Eye className="w-4 h-4 text-slate-500" />
              </Button>
            }
          >
            <div className="flex items-center">
              <User className="w-6 h-6 mr-1.5 text-slate-500" />
              <p className="text-slate-800">Personal Information</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-none">
            <Card className="p-6">
              <div className="flex items-center justify-between gap-2 py-2">
                <div className="grid gap-1">
                  <Label
                    htmlFor="first name"
                    className="text-xs text-slate-600"
                  >
                    first name
                  </Label>
                  <Input
                    placeholder="first name"
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
                <div className="grid gap-1">
                  <Label htmlFor="last name" className="text-xs text-slate-600">
                    last name
                  </Label>
                  <Input
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
              <div className="grid gap-1 py-2 ">
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
              <div className="grid gap-1 py-2">
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
              <div className="flex items-center justify-between gap-2 py-2">
                <div className="grid gap-1">
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
                <div className="grid gap-1">
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
              <div className="py-6">
                <Textarea
                  value={profile}
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PersonalInfoAccordition;

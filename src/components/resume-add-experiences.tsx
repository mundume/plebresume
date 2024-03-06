import {
  resumeSchema,
  workExperience,
  type WorkExperienceValues,
} from "@/lib/validators/resume-validator";
import React from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Action, WorKexperience } from "./resume-builder-context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { register } from "module";

type SkillsProps = {
  values: WorKexperience;
  dispatch: React.Dispatch<Action>;
};
const AddExperience = ({ values, dispatch }: SkillsProps) => {
  const form = useForm({
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
    <Form {...form} control={form.control}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          dispatch({ type: "ADD_WORK_EXPERIENCES", payload: [data] });
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="shadcn"
                  {...field}
                  onError={() => formState.errors.title}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit">pleb</button>
      </form>
    </Form>
  );
};

//   const form = useForm<formSchema>({
//     resolver: zodResolver(workExperience),
//     defaultValues: {
//       companyName: "",
//       description: "",
//       endDate: "",
//       startDate: "",
//       title: "",
//     },
//   });
//   return (
//     <div>
//       <Card className="w-full">
//         <form
//           onSubmit={form.handleSubmit((data) =>
//             dispatch({
//               type: "ADD_WORK_EXPERIENCES",
//               payload: [data],
//             })
//           )}
//         >
//           <Input placeholder="Job Title" {...form.register("title")} />
//           <Button type="submit">save</Button>
//         </form>
//       </Card>
//     </div>
//   );
// };

export default AddExperience;

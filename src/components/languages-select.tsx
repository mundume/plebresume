import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

const LanguagesSelect = ({
  field,
}: {
  field: ControllerRenderProps<
    {
      languages: {
        level: string;
        languages: string;
      }[];
    },
    any
  >;
}) => {
  return (
    <Select
      {...field}
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger className="w-[250px] dark:text-slate-500">
        <SelectValue placeholder="Select Proficiency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="A1 (Beginner)" className="">
          <span className="flex items-center justify-center gap-1 ">
            A1 (Beginner)
          </span>
        </SelectItem>
        <SelectItem value="A2 (Elementary)" className="">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            A2 (Elementary)
          </span>
        </SelectItem>

        <SelectItem value="B1 (Intermediate)" className="">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            B1 (Intermediate)
          </span>
        </SelectItem>
        <SelectItem value="B2 (Upper Intermediate)">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            B2 (Upper Intermediate)
          </span>
        </SelectItem>
        <SelectItem value="C1 (Advanced)">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            C1 (Advanced)
          </span>
        </SelectItem>
        <SelectItem value="C2 (Proficient)">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            C2 (Proficient)
          </span>
        </SelectItem>
        <SelectItem value="Native speaker">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            Native speaker
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguagesSelect;

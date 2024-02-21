import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowUpDown, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Span } from "@sentry/nextjs";

const MobileThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  console.log(theme);
  return (
    <Select onValueChange={(theme) => setTheme(theme)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={theme} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light" className="">
          <span className="flex items-center justify-center ">
            <Sun className=" mr-1.5 dark:text-slate-400 text-slate-600" /> Light
          </span>
        </SelectItem>
        <SelectItem value="dark" className="">
          <span className="flex items-center justify-center dark:text-slate-50 ">
            <Sun className=" mr-1.5 dark:text-slate-400 text-slate-600" /> Light
          </span>
        </SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default MobileThemeToggle;

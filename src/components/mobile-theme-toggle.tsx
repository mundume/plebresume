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

const MobileThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  console.log(theme);
  return (
    <Select onValueChange={(theme) => setTheme(theme)}>
      <SelectTrigger className="w-[150px] dark:text-slate-500">
        <SelectValue
          placeholder={
            theme == "light" ? (
              <>
                <span className="flex items-center justify-center gap-3 ">
                  <Sun className=" mr-1.5 dark:text-slate-400 text-slate-600" />{" "}
                  Light
                </span>
              </>
            ) : theme === "dark" ? (
              <>
                <span className="flex items-center justify-center gap-3 ">
                  <Moon className=" mr-1.5 dark:text-slate-400 text-slate-600" />{" "}
                  Dark
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center justify-center gap-3 ">
                  <Monitor className=" mr-1.5 dark:text-slate-400 text-slate-600" />{" "}
                  System
                </span>
              </>
            )
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light" className="">
          <span className="flex items-center justify-center gap-3 ">
            <Sun className=" mr-1.5 dark:text-slate-400 text-slate-600" /> Light
          </span>
        </SelectItem>
        <SelectItem value="dark" className="">
          <span className="flex items-center justify-center gap-3 dark:text-slate-50 ">
            <Moon className=" mr-1.5 dark:text-slate-400 text-slate-600" /> Dark
          </span>
        </SelectItem>
        <SelectItem value="system">
          <span className="flex items-center justify-center gap-3 dark:text-slate-50 ">
            <Monitor className=" mr-1.5 dark:text-slate-400 text-slate-600" />{" "}
            System
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default MobileThemeToggle;

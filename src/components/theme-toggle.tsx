"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="pleb"
          size="icon"
          className="rounded-full text-slate-600 dark:border dark:border-slate-800 "
        >
          <Sun className="w-4 h-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0 text-slate-600" />
          <Moon className="absolute w-4 h-4 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

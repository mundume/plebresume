"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { inferRouterOutputs } from "@trpc/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AppRouter } from "@/trpc";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type TRPCRouterOutput = inferRouterOutputs<AppRouter>;

export type TFileData = TRPCRouterOutput["getUserFiles"];

export const columns: ColumnDef<TFileData>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {},
  },
  {
    accessorKey: "email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

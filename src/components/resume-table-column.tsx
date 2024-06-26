"use client";

import { AppRouter } from "@/trpc";
import { ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns/format";
import DeleteFileButton from "./DeleteFileButton";
import Link from "next/link";

type TRPCRouterOutput = inferRouterOutputs<AppRouter>;

export type TFileData = TRPCRouterOutput["getResumes"][0];

export const resumeColumns: ColumnDef<TFileData>[] = [
  {
    id: "select",
    header: ({ table, column }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <p className="text-left">Name</p>,
    cell: ({ row }) => {
      const k = row.original.name;

      return <Link href={`/resume/${row.original.id}`}>{k}</Link>;
    },
  },

  {
    accessorKey: "updated",
    header: ({ column }) => {
      return <p> Last updated</p>;
    },
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return <p className=""> {format(updatedAt, "MMM d, yyyy, h:mm a")}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const resume = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(resume.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <DeleteFileButton fileId={resume.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

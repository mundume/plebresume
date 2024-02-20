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

type TRPCRouterOutput = inferRouterOutputs<AppRouter>;

export type TFileData = TRPCRouterOutput["getUserFiles"][0];

export const columns: ColumnDef<TFileData>[] = [
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

      return <p>{k}</p>;
    },
  },

  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const size = row.original.size!;
      return (
        <p className="text-sm text-slate-500">{(size / 1024).toFixed(2)}kb</p>
      );
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
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <DeleteFileButton fileId={payment.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

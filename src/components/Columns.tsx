"use client";

import { AppRouter } from "@/trpc";
import { ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TRPCRouterOutput = inferRouterOutputs<AppRouter>;

export type TFileData = TRPCRouterOutput["getUserFiles"][0];

export const columns: ColumnDef<TFileData>[] = [
  {
    accessorKey: "name",
    header: () => <p className="text-left">Name</p>,
    cell: ({ row }) => {
      const k = row.original.name;

      return <p>{k}</p>;
    },
  },

  {
    accessorKey: "updated",
    header: "Last Updated",
    cell: ({ row }) => {
      return <p className="">{row.original.updatedAt}</p>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const size = row.original.size!;
      return <p className="">{(size / 1024).toFixed(2)}kb</p>;
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
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

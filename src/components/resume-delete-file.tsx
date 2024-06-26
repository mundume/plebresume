"use client";
import { trpc } from "@/app/_trpc/client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Command, Delete, Loader, Trash } from "lucide-react";
import { toast } from "sonner";
type Props = {
  fileId: string;
};
const ResumeDelete = ({ fileId }: Props) => {
  const utils = trpc.useUtils();
  const {
    mutate: deleteFile,
    isLoading,
    isError,
    error,
  } = trpc.deleteResume.useMutation({
    onSuccess: () => {
      utils.getResumes.invalidate();
      toast.success("File deleted");
    },

    onSettled: () => {
      toast.dismiss();
    },
  });
  if (isLoading) toast.loading("Deleting file");
  return (
    <p
      onClick={() => deleteFile({ id: fileId })}
      className="flex items-center justify-between w-full"
    >
      Delete{" "}
      <span className="flex ">
        <Command className="w-4 h-4 text-slate-600 " />
        <Delete className="w-4 h-4 text-slate-600 " />
      </span>
    </p>
  );
};

export default ResumeDelete;

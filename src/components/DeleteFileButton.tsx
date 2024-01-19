"use client";
import { trpc } from "@/app/_trpc/client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader, Trash } from "lucide-react";
type Props = {
  fileId: string;
};
const DeleteFileButton = ({ fileId }: Props) => {
  const [isCurrentDeleting, setisCurrentDeleting] = useState<string | null>();
  const utils = trpc.useUtils();
  const {
    mutate: deleteFile,
    isLoading,
    isError,
    error,
  } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate: ({ id }) => {
      setisCurrentDeleting(id);
    },
    onSettled: () => {
      setisCurrentDeleting(null);
    },
  });
  return (
    <Button size={"icon"} onClick={() => deleteFile({ id: fileId })}>
      {isCurrentDeleting === fileId ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Trash className="w-4 h-4 text-red-500" />
      )}
    </Button>
  );
};

export default DeleteFileButton;

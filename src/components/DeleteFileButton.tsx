"use client";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import { Command, Delete } from "lucide-react";
import { toast } from "sonner";
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
      toast.success("File deleted");
    },
    onMutate: ({ id }) => {
      setisCurrentDeleting(id);
    },
    onSettled: () => {
      setisCurrentDeleting(null);
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

export default DeleteFileButton;

"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const CreateResume = ({ userId }: { userId: string }) => {
  const newResume = trpc.createResume.useMutation({});
  const utils = trpc.useUtils();

  return (
    <Button
      onClick={() =>
        newResume.mutate(
          {
            userId,
          },
          {
            onSuccess: () => {
              utils.getResumes.invalidate();
            },
            onError: () => {
              toast.error("Error creating resume");
            },
          }
        )
      }
    >
      {newResume.isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="ml-2">Creating Resume</span>
        </>
      ) : (
        "Create Resume"
      )}
    </Button>
  );
};

export default CreateResume;

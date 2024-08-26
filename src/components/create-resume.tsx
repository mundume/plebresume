"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";
const CreateResume = ({ userId }: { userId: string }) => {
  const newResume = trpc.createResume.useMutation({});
  const utils = trpc.useUtils();

  return (
    <div className="flex justify-end">
      <Button
        className="bg-primary hover:bg-primary/80 text-primary-foreground my-4"
        onClick={() =>
          newResume.mutate(
            {
              userId,
            },
            {
              onSuccess: () => {
                utils.getResumes.invalidate();
                toast.success(
                  "Resume created click on it to go to the resume builder!"
                );
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
            <Loader className="w-4 h-4 animate-spin  " />
            <span className="ml-2">Creating Resume</span>
          </>
        ) : (
          "Create Resume"
        )}
      </Button>
    </div>
  );
};

export default CreateResume;

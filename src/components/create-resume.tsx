"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
const CreateResume = ({ userId }: { userId: string }) => {
  const newResume = trpc.createResume.useMutation({});
  return (
    <Button
      onClick={() =>
        newResume.mutate({
          userId,
        })
      }
    >
      {newResume.isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        "Create Resume"
      )}
    </Button>
  );
};

export default CreateResume;

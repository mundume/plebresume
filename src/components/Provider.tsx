"use client";

import { trpc } from "@/app/_trpc/client";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";

type ResumeResponse = {
  generateCoverLetter: () => void;
  fileId: string;
  isLoading: boolean;
};

export const ResumeContext = createContext<ResumeResponse>({
  generateCoverLetter: () => {},
  fileId: "",
  isLoading: false,
});

type ContextProps = {
  fileId: string;
  children: ReactNode;
};

export const ResumeContextProvider = ({ fileId, children }: ContextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const utils = trpc.useUtils();
  const {
    mutate: pleb,
    data,
    isLoading: loading,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/coverletter", {
        method: "POST",
        body: JSON.stringify({
          fileId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate cover letter");
      }
      return response.body;
    },
    onSuccess: async (stream) => {
      if (!stream) {
        return toast.error("There was an error generating your cover letter");
      }
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;

      let accumulatedResponse = "";
      while (!done) {
        const { done: doneReading, value } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        accumulatedResponse += chunkValue;
        console.log(accumulatedResponse);
        utils.getCoverLetter.setInfiniteData(
          {
            fileId,
          },
          (oldData) => {
            if (!oldData)
              return {
                pages: [],
                pageParams: [],
              };
            let aiResponse = oldData.pages.some(
              (page) => page.id === "ai-response"
            );
          }
        );
        //append the chunk to the message
      }
    },
    onSettled: () => {
      utils.getCoverLetter.invalidate();
    },
  });
  const generateCoverLetter = () => pleb();
  return (
    <ResumeContext.Provider
      value={{
        generateCoverLetter,
        fileId,
        isLoading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

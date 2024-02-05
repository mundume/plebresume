"use client";

import { trpc } from "@/app/_trpc/client";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";

type ResumeResponse = {
  generateCoverLetter: () => void;
  fileId: string;
  isLoading: boolean;
  response: string;
};

export const ResumeContext = createContext<ResumeResponse>({
  generateCoverLetter: () => {},
  fileId: "",
  isLoading: false,
  response: "",
});

type ContextProps = {
  fileId: string;
  children: ReactNode;
};

export const ResumeContextProvider = ({ fileId, children }: ContextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const utils = trpc.useUtils();
  const { mutate: pleb } = useMutation({
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
    onMutate: () => {
      setIsLoading(true);
      setResponse("");
    },
    onSuccess: async (stream) => {
      setIsLoading(true);
      if (!stream) {
        setIsLoading(false);
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
        //append the chunk to value
        console.log(accumulatedResponse);

        setResponse(accumulatedResponse);
        setIsLoading(false);
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
        response,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

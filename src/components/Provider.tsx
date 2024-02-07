"use client";

import { trpc } from "@/app/_trpc/client";
import { CoverLetterFormSchema } from "@/lib/validators/coverlettervalidator";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type ResumeResponse = {
  generateCoverLetter: (jobTitle: string, jobDescription: string) => void;
  fileId: string;
  isLoading: boolean;
  response: string;
  jobTitle: string;
  jobDescription: string;
  setJobTitle: (jobTitle: string) => void;
  setJobDescription: (jobDescription: string) => void;
};

export const ResumeContext = createContext<ResumeResponse>({
  generateCoverLetter: (jobTitle: string, jobDescription: string) => {},
  fileId: "",
  isLoading: false,
  response: "",
  jobTitle: "",
  jobDescription: "",
  setJobTitle: (jobTitle: string) => {},
  setJobDescription: (jobDescription: string) => {},
});

type ContextProps = {
  fileId: string;
  children: ReactNode;
};

export const ResumeContextProvider = ({ fileId, children }: ContextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

  const utils = trpc.useUtils();

  const { mutate: pleb } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/coverletter", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          jobTitle,
          jobDescription,
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
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      toast.error("There was an error generating your cover letter");
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
        jobTitle,
        jobDescription,
        setJobTitle,
        setJobDescription,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

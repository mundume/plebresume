"use client";

import { trpc } from "@/app/_trpc/client";
import { useMutation } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

type ResumeResponse = {
  generateCoverLetter: () => void;
  fileId: string;
  isLoading: boolean;
  response: string;
  formValues: FormValues;
  setFormValues: (formValues: FormValues) => void;
  setResponse: (response: string) => void;
};

//this will be moved from usestate to useReducer soon
export const ResumeContext = createContext<ResumeResponse>({
  generateCoverLetter: () => {},
  fileId: "",
  isLoading: false,
  response: "",
  formValues: {
    jobTitle: "",
    jobDescription: "",
  },
  setFormValues: (formValues: FormValues) => {},
  setResponse: (response: string) => {},
});

type ContextProps = {
  fileId: string;
  children: ReactNode;
};

type FormValues = {
  jobTitle: string;
  jobDescription: string;
};

export const ResumeContextProvider = ({ fileId, children }: ContextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [formValues, setFormValues] = useState<FormValues>({
    jobTitle: "",
    jobDescription: "",
  });
  const utils = trpc.useUtils();

  const { mutate: pleb } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/coverletter", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          ...formValues,
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
        //append the chunk to response

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
  const generateCoverLetter = useCallback(() => pleb(), []);
  const contextValue = useMemo(
    () => ({
      generateCoverLetter,
      fileId,
      isLoading,
      response,
      formValues,
      setFormValues,
      setResponse,
    }),
    [
      generateCoverLetter,
      fileId,
      isLoading,
      response,
      formValues,
      setFormValues,
      setResponse,
    ]
  );

  return (
    <ResumeContext.Provider
      value={{
        ...contextValue,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = use(ResumeContext);
  if (!context) {
    throw new Error(
      "useResumeContext must be used within a ResumeContextProvider"
    );
  }
  return context;
};

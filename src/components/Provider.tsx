"use client";

import { trpc } from "@/app/_trpc/client";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";
import { ChatCompletion } from "openai/resources/index";
import { Annoyed, Delete } from "lucide-react";

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
      const response = await fetch("/api/coverletterrr", {
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
      if (!stream) {
        return toast.error("There was an error generating your cover letter");
      }
      //get the stream
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;

      let accumulatedResponse = "";
      while (!done) {
        const { done: doneReading, value } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        accumulatedResponse += chunkValue;

        setResponse(accumulatedResponse);
        setIsLoading(false);
      }
    },
    onSettled: () => {
      utils.getCoverLetter.invalidate();
    },
    onError: () => {
      toast.error(<Annoyed className="w-6 h-6 text-yellow-400" />, {
        style: {
          background: "white",
          color: "#F98080",
        },
        position: "top-right",
        description: "There was an error generating your cover letter",
      });
      setIsLoading(false);
      setResponse("");
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

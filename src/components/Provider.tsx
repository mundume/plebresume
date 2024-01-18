"use client";

import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";

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

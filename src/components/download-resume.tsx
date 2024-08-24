"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function DownloadResume({ resumeId }: { resumeId: string }) {
  const [done, setDone] = useState(false);
  const mutation = useMutation({
    mutationFn: async ({ resumeId }: { resumeId: string }) => {
      const res = await fetch(`/api/onedoc?id=${resumeId}`, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },

    retry: true,

    onSuccess: () => {
      setDone(true);
      setTimeout(() => {
        mutation.reset();
        setDone(false);
      }, 2000);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error Downloading PDF");
    },
  });
  return (
    <Button onClick={() => mutation.mutate({ resumeId })}>
      {done ? "Downloaded" : "Download"}
    </Button>
  );
}

export default DownloadResume;

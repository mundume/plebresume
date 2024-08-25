"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Download, Loader } from "lucide-react";

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
    <Button
      size={"sm"}
      onClick={() => mutation.mutate({ resumeId })}
      className="flex items-center justify-center dark:bg-accent dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground"
      icon={
        mutation.isLoading ? (
          <Loader className="w-4 h-4 mr-1.5 animate-spin text-yellow-500" />
        ) : mutation.isSuccess && done ? (
          <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-400" />
        ) : (
          <Download className="w-4 h-4 mr-1.5 text-yellow-500" />
        )
      }
    >
      {mutation.isLoading
        ? " wait.."
        : mutation.isSuccess && done
        ? "done"
        : "download"}
    </Button>
  );
}

export default DownloadResume;

"use client";
import SimpleBar from "simplebar-react";
import CoverLetter from "./CoverLetter";
import { ResumeContext } from "./Provider";
import { use, useRef, useState } from "react";
import { Eye, Loader, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { trpc } from "@/app/_trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { error } from "console";
import { toast } from "sonner";

const CoverLetterRenderer = () => {
  const [preview, setPreview] = useState<boolean>(true);
  const { response, isLoading } = use(ResumeContext);
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/pdf`, {
        method: "POST",
        body: JSON.stringify({
          content: response,
        }),
        headers: {
          Accept: "application/pdf",
        },
      });
      return res.blob();
    },
  });
  const ref = useRef();

  const { signal } = new AbortController();
  const onChange = () => setPreview((prev) => !prev);

  return (
    <div className="">
      {/* @ts-ignore */}
      {/* <GeneratePDF html={ref} /> */}
      <Button
        onClick={async () => {
          const blob = await mutation.mutateAsync();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "cover-letter.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        {mutation.isLoading ? "Loading..." : "Generate"}
      </Button>
      <Button
        onClick={async () => {
          try {
            const res = await fetch("/api/pdf", {
              method: "GET",
              body: JSON.stringify({
                content: response,
              }),
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
            link.setAttribute("download", "cover-letter.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error("Error generating PDF:", error);
          }
        }}
      >
        Generate PDF
      </Button>

      <div className="w-full min-h-screen my-4 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-1 mx-auto my-auto mt-44">
            <Loader className="w-6 h-6 text-slate-600 animate-spin" />{" "}
            <p className="text-sm prose ">
              Your cover letter is generating you{" "}
              <span className="text-lg font-bold text-yellow-400">
                useless degen
              </span>{" "}
              who cant even write thier own cover letter and you&apos;re there
              full of hope for a job{" "}
              <span className="w-4 h-10 font-mono text-3xl text-slate-500">
                💀💀
              </span>
            </p>
          </div>
        ) : (
          <>
            {" "}
            {response && (
              <div className="flex items-center justify-start gap-4 px-4 pb-4 bg-white/50 backdrop-blur-lg">
                <Button
                  onClick={onChange}
                  size={"icon"}
                  className="transition-all hover:brightness-125 hover:shadow-2xl"
                >
                  {preview ? (
                    <Pencil className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-600" />
                  )}
                </Button>
              </div>
            )}
            <SimpleBar autoHide={false} className="">
              {/* @ts-ignore */}
              <div ref={ref}>
                <CoverLetter preview={preview} response={response} />
              </div>
            </SimpleBar>
          </>
        )}
      </div>
    </div>
  );
};

export default CoverLetterRenderer;

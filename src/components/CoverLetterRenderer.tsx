"use client";
import SimpleBar from "simplebar-react";
import CoverLetter from "./CoverLetter";
import { ResumeContext, useResumeContext } from "./Provider";
import { use, useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  DownloadCloud,
  Eye,
  Loader,
  Pencil,
} from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { MDXEditorMethods } from "@mdxeditor/editor";

const CoverLetterRenderer = () => {
  const [preview, setPreview] = useState<boolean>(true);
  const { response, isLoading } = useResumeContext();
  const [value, setValue] = useState<string>("");
  const updatedValue = (value: string) => {
    setValue(value);
  };
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    editorRef.current?.setMarkdown(value);
    setValue(response);

    console.log(value);
  }, [response, value]);
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
      window.URL.revokeObjectURL(url);
    },

    retry: true,
    retryDelay: 500,

    onError: (err) => {
      console.log(err);
      toast.error("Error Downloading PDF");
    },
  });
  const ref = useRef();
  const updateValue = (value: string) => {
    setValue(value);
  };

  const onChange = () => setPreview((prev) => !prev);

  return (
    <div className="">
      <div className="w-full min-h-screen my-4 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-1 mx-auto my-auto mt-44">
            <Loader className="w-6 h-6 text-slate-600 animate-spin" />{" "}
            <p className="text-sm prose ">
              Your cover letter is generating you{" "}
              <span className="text-lg font-bold text-purple-500">
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
              <div className="flex items-center justify-between gap-4 px-4 pb-4 bg-white/50 backdrop-blur-lg">
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
                <Button onClick={() => mutation.mutate()}>
                  {mutation.isLoading ? (
                    <>
                      Downloading...
                      <Loader className="w-4 h-4 ml-1.5 animate-spin text-slate-600" />{" "}
                    </>
                  ) : mutation.isSuccess ? (
                    <>
                      Downloaded
                      <CheckCircle2 className="w-4 h-4 ml-1.5 text-green-400" />
                    </>
                  ) : (
                    <>
                      Download as PDF
                      <DownloadCloud className="w-4 h-4 ml-1.5 text-slate-600" />
                    </>
                  )}
                </Button>
              </div>
            )}
            <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
              {/* @ts-ignore */}
              <div ref={ref}>
                <CoverLetter
                  preview={preview}
                  response={value}
                  updatedValue={updatedValue}
                />
              </div>
            </SimpleBar>
          </>
        )}
      </div>
    </div>
  );
};

export default CoverLetterRenderer;

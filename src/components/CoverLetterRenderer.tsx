"use client";
import SimpleBar from "simplebar-react";
import CoverLetter from "./CoverLetter";
import { useCoverLetterContext } from "./Provider";
import { useRef, useState } from "react";
import { CheckCircle2, Download, Eye, Loader, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const CoverLetterRenderer = () => {
  const [preview, setPreview] = useState<boolean>(true);
  const { response, isLoading } = useCoverLetterContext();
  const [done, setDone] = useState(false);

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
  const ref = useRef();

  const onChange = () => setPreview((prev) => !prev);

  return (
    <div className="py-4">
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
        ) : !isLoading && !response ? (
          <>
            <div className="flex flex-col items-center justify-center gap-1 mx-auto my-auto mt-44">
              <p className="text-sm prose text-slate-600 dark:text-popover-foreground ">
                Nothing to see here. click the{" "}
                <span className="font-bold text-purple-500 ">play</span> button
                and have fun
              </p>
            </div>
          </>
        ) : (
          <>
            {" "}
            {response && (
              <div>
                <div className="flex items-center justify-between gap-4 px-4 pb-4 backdrop-blur-lg ">
                  <Button
                    onClick={onChange}
                    size={"icon"}
                    className=""
                    variant={"outline"}
                  >
                    {preview ? (
                      <Pencil className="w-4 h-4 transition duration-200 text-slate-600 hover:opacity-1 " />
                    ) : (
                      <Eye className="w-4 h-4 transition duration-200 text-slate-600 hover:opacity-1" />
                    )}
                  </Button>
                  <Button
                    onClick={() => mutation.mutate()}
                    className="flex items-center justify-center dark:bg-accent dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground"
                    icon={
                      mutation.isLoading ? (
                        <Loader className="w-4 h-4 mr-1.5 animate-spin text-purple-500" />
                      ) : mutation.isSuccess && done ? (
                        <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-400" />
                      ) : (
                        <Download className="w-4 h-4 mr-1.5 text-purple-500" />
                      )
                    }
                  >
                    {mutation.isLoading
                      ? " wait.."
                      : mutation.isSuccess && done
                      ? "done"
                      : "download"}
                  </Button>
                </div>
                <SimpleBar
                  autoHide={false}
                  className="max-h-[calc(100vh-2rem)]"
                >
                  {/* @ts-ignore */}
                  <div ref={ref}>
                    <CoverLetter preview={preview} response={response} />
                  </div>
                </SimpleBar>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoverLetterRenderer;

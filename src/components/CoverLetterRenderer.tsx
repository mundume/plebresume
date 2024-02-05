"use client";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import CoverLetter from "./CoverLetter";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { use, useState } from "react";
import { Eye, Loader } from "lucide-react";
import { Button } from "./ui/button";

const CoverLetterRenderer = () => {
  const [preview, setPreview] = useState<boolean>(true);

  const { response, isLoading } = use(ResumeContext);

  const onChange = () => setPreview((prev) => !prev);

  return (
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
          <div className="flex items-center justify-start gap-4 px-4 pb-4 bg-white/50 backdrop-blur-lg">
            <Button onClick={onChange} size={"icon"}>
              Edit <Eye className="w-4 h-4 text-slate-600" />
            </Button>
          </div>
          <SimpleBar
            autoHide={false}
            className="max-h-[calc(100vh-4rem)] border-none focus-visible:border-none"
          >
            <CoverLetter preview={preview} response={response} />
          </SimpleBar>
        </>
      )}
    </div>
  );
};

export default CoverLetterRenderer;

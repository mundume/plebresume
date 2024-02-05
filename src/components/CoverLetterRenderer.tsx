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
  const [preview, setPreview] = useState<boolean>(false);

  const { response } = use(ResumeContext);

  const onChange = () => setPreview((prev) => !prev);

  return (
    <div className="w-full min-h-screen my-4 overflow-hidden">
      <div className="flex items-center justify-start gap-4 px-4 pb-4 bg-white/50 backdrop-blur-lg">
        <Button onClick={onChange} size={"icon"}>
          <Eye className="w-4 h-4 text-slate-600" />
        </Button>
      </div>

      <SimpleBar
        autoHide={false}
        className="max-h-[calc(100vh-4rem)] border-none focus-visible:border-none"
      >
        <CoverLetter preview={preview} response={response} />
      </SimpleBar>
    </div>
  );
};

export default CoverLetterRenderer;

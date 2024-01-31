"use client";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import CoverLetter from "./CoverLetter";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { useContext, useState } from "react";
import { Eye, Loader } from "lucide-react";
import { Button } from "./ui/button";

const CoverLetterRenderer = () => {
  const [preview, setPreview] = useState<boolean>(false);

  const { height, ref } = useResizeDetector();

  const { fileId, isLoading: loading, response } = useContext(ResumeContext);

  const { data: coverLetter, isLoading } = trpc.getCoverLetter.useQuery(
    {
      fileId,
    },
    {
      retry: true,
    }
  );

  const onChange = () => setPreview((prev) => !prev);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-64 mx-auto ">
        <div className="w-8 h-8 rounded-full ">
          <Loader className="w-8 h-8 text-slate-600 animate-spin " />
        </div>
        <p className="text-sm prose ">
          Your cover letter is generating you{" "}
          <span className="text-lg font-bold text-yellow-500">
            useless degen
          </span>{" "}
          who cant even write thier own cover letter and youre hopping to get a
          job
        </p>
      </div>
    );
  }
  if (!coverLetter?.text) return;
  const html = coverLetter?.text;
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
        <div ref={ref}>
          <CoverLetter
            coverLetter={coverLetter?.text}
            response={response}
            preview={preview}
          />
        </div>
      </SimpleBar>
    </div>
  );
};

export default CoverLetterRenderer;

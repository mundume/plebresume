"use client";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import CoverLetter from "./CoverLetter";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { useContext, useEffect, useState } from "react";
import { Eye, Loader, View } from "lucide-react";
import { PlateEditor } from "./editor/plateEditor";
import { Button } from "./ui/button";
import { useCompletion } from "ai/react";

const CoverLetterRenderer = () => {
  const [preview, setPreview] = useState<boolean>(false);
  const {
    completion,
    handleSubmit,
    isLoading: plebbing,
  } = useCompletion({
    api: "/api/coverletter",
  });

  // useEffect(() => {
  //   setIsRendered(true);

  //   return () => {
  //     setIsRendered(false);
  //   };
  // }, []);

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
      <Loader className="flex items-center justify-center w-8 h-8 text-slate-600 my-44 mx-96 animate-spin" />
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

      {plebbing ? "..." : completion}
    </div>
  );
};

export default CoverLetterRenderer;

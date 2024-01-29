"use client";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import CoverLetter from "./CoverLetter";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { useContext, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { PlateEditor } from "./editor/plateEditor";

const CoverLetterRenderer = () => {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);

    return () => {
      setIsRendered(false);
    };
  }, []);
  const { height, ref } = useResizeDetector();

  const { fileId } = useContext(ResumeContext);
  console.log(fileId);

  const { data: coverLetter, isLoading } = trpc.getCoverLetter.useQuery(
    {
      fileId,
    },
    {
      retry: true,
    }
  );

  if (!coverLetter) {
    <div className="w-full min-h-screen text-slate-600 ">No Coverletter</div>;
  }
  if (isLoading) {
    return (
      <Loader className="flex items-center justify-center w-8 h-8 text-slate-600 my-44 mx-96 animate-spin" />
    );
  }
  if (!coverLetter?.text) return;
  const html = coverLetter?.text;
  return (
    <div className="w-full min-h-screen my-4 overflow-hidden">
      <SimpleBar
        autoHide={false}
        className="max-h-[calc(100vh-4rem)] border-none focus-visible:border-none"
      >
        <div ref={ref}>
          <CoverLetter coverLetter={coverLetter?.text} />
        </div>
      </SimpleBar>
    </div>
  );
};

export default CoverLetterRenderer;

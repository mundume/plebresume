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

const CoverLetterRenderer = ({}) => {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
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
  console.log(coverLetter?.text);
  const html = coverLetter?.text;
  return (
    <div className="w-full min-h-full overflow-none">
      {isRendered && (
        <PDFDownloadLink
          document={<CoverLetter coverLetter={coverLetter?.text!} />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      )}
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-4rem)]">
        <div ref={ref}>
          <CoverLetter coverLetter={coverLetter?.text!} />
        </div>
      </SimpleBar>
      <PlateEditor coverLetter={coverLetter?.text} />
    </div>
  );
};

export default CoverLetterRenderer;

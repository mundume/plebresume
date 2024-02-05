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
import { inputVariants } from "./plate-ui/input";

const CoverLetterRenderer = () => {
  const [preview, setPreview] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  // useEffect(() => {
  //   setIsRendered(true);

  //   return () => {
  //     setIsRendered(false);
  //   };
  // }, []);

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

  const onChange = () => setPreview((prev) => !prev);

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
      <input
        onChange={(e) => setValue(e.target.value)}
        className={inputVariants()}
      />
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
            preview={preview}
            value={value}
          />
        </div>
      </SimpleBar>
    </div>
  );
};

export default CoverLetterRenderer;

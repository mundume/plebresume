"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { use, useState } from "react";
import { Button } from "./ui/button";
import { Bot, ChevronLeft, ChevronRight, Loader, Repeat } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import ResumeFullscreen from "./ResumeFullscreen";

import { useCoverLetterContext } from "./Provider";
import CoverLetterForm from "./CoverLetterForm";
import FormDrawerMobile from "./form-drawer-mobile";
import ApplicationForm from "./application-form";

//pdfjs add globalworker options
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type Props = {
  url: string;
  id: string;
};
const PdfRenderer = ({ url, id }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { generateCoverLetter, isLoading, response } = useCoverLetterContext();
  const { ref, width } = useResizeDetector();

  return (
    <div>
      <div className="w-full min-h-screen my-4 overflow-hidden">
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-start gap-4 px-4 pt-4 backdrop-blur-lg">
            <ResumeFullscreen url={url} />

            <Button
              onClick={() => setPageNumber((prev) => prev - 1)}
              disabled={pageNumber <= 1}
              size={"icon"}
              variant={"outline"}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </Button>
            <Button
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={pageNumber === numPages || numPages === undefined}
              size={"icon"}
              variant={"outline"}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <div className="flex items-center justify-end gap-4 px-4 py-4 backdrop-blur-lg">
            <div>
              <div className="hidden sm:block">
                <CoverLetterForm />
              </div>
              <div className="block sm:hidden">
                <FormDrawerMobile />
              </div>
            </div>

            {response ? (
              <Button
                onClick={() => generateCoverLetter()}
                size={"icon"}
                variant={"outline"}
                aria-label="Regenerate your cover letter if youre not happy with it"
              >
                <Repeat className="w-4 h-4 text-purple-500 hover:shadow-2xl" />
              </Button>
            ) : null}
          </div>
        </div>

        <SimpleBar autoHide={false} className="max-h-[calc(100vh-2rem)]">
          <div ref={ref}>
            <Document
              file={url}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="flex items-center justify-center mt-48 ">
                  <Loader className="w-8 h-8 animate-spin" />
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={width ? width : 1}
                loading={
                  <div className="flex items-center justify-center mt-48 ">
                    <Loader className="w-8 h-8 animate-spin" />
                  </div>
                }
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;

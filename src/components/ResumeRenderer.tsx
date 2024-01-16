"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import ResumeFullscreen from "./ResumeFullscreen";
import GenerateCoverLetter from "./GenerateCoverLetter";
import { useAtom } from "jotai";
import { priceAtom } from "@/lib/jotai";

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
  const { ref, width } = useResizeDetector();
  const [price, setPrice] = useAtom(priceAtom);
  return (
    <div>
      {price}
      <Button onClick={() => setPrice(price + 10)}>updateprice</Button>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4 px-4 py-4 bg-white/50 backdrop-blur-lg">
          <ResumeFullscreen url={url} />
          <Button
            onClick={() => setPageNumber((prev) => prev - 1)}
            disabled={pageNumber <= 1}
            size={"icon"}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </Button>
          <Button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={pageNumber === numPages || numPages === undefined}
            size={"icon"}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
        <GenerateCoverLetter id={id} />
      </div>
      <div className="w-full min-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
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

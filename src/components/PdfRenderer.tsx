"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { Button } from "./ui/button";
import { Divide, Loader } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type Props = {
  url: string;
};
const PdfRenderer = ({ url }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div>
      <div className="flex justify-around py-4 border bg-white/50 backdrop-blur-lg ">
        <Button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber <= 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber === numPages || numPages === undefined}
        >
          Next
        </Button>
      </div>
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
          loading={
            <div className="flex items-center justify-center mt-48 ">
              <Loader className="w-8 h-8 animate-spin" />
            </div>
          }
        />
      </Document>
    </div>
  );
};

export default PdfRenderer;

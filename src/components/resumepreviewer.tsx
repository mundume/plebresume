"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Line,
  Path,
  Polygon,
  Rect,
  PDFDownloadLink,
  usePDF,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useCoverLetterContext } from "./Provider";
import { useResumeBuilderContext } from "./resume-builder-context";
import Markdown from "react-markdown";
import ReactMarkdownProps from "react-markdown";
import Resume from "./resume";
type MarkdownProps = typeof ReactMarkdownProps;

const ResumePreviewer = () => {
  const { values } = useResumeBuilderContext();
  const { ref, height } = useResizeDetector();

  const { address, email, names, phone, profile } = values.personalInfo;
  return (
    <div className="block w-full min-h-screen">
      <PDFDownloadLink
        document={<Resume values={values} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref} className="">
          <Resume values={values} />
        </div>
      </SimpleBar>
    </div>
  );
};

export default ResumePreviewer;

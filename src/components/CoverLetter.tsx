"use client";
import {
  Page,
  Text,
  View,
  Document,
  Link,
  usePDF,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useContext, useEffect, useState } from "react";
import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { Download, Loader } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import MarkDown from "react-markdown";
import { Button, buttonVariants } from "./ui/button";
import { Html } from "react-pdf-html";
import Markdown, { Components } from "react-markdown";
import { PlateEditor } from "./editor/plateEditor";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {},
  },
});

const components = {};

const CoverLetter = ({ coverLetter }: { coverLetter: string }) => {
  return (
    <Document pageLayout="singlePage">
      <Page style={tw("p-6 flex flex-col h-fit ")} wrap={false}>
        <View style={tw(" bg-white")}>
          <Text style={tw("prose")}>
            <MarkDown
              className="prose"
              rehypePlugins={[rehypeHighlight, rehypeReact]}
              remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
            >
              {coverLetter}
            </MarkDown>
          </Text>
        </View>
        {/* <PlateEditor /> */}
      </Page>
    </Document>
  );
};

export default CoverLetter;

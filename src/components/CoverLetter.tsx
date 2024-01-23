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
              {/* @ts-ignore */}
              {coverLetter}
            </MarkDown>
          </Text>
        </View>
      </Page>
    </Document>

    // <Document>
    //   <Page size="A4" style={tw("p-6 flex flex-col h-fit ")} wrap={false}>
    //     <View style={tw("prose block")}>
    //       <Markdown
    //         className=""
    //         components={{
    //           h1: ({ children }) => (
    //             <Text style={tw("text-4xl py-4 text-red-500 prose")}>
    //               {children}
    //             </Text>
    //           ),
    //           p: ({ children }) => (
    //             <View style={tw("prose text-red-500")}>{children}</View>
    //           ),
    //           strong: ({ children }) => (
    //             <Text style={tw("font-bold prose")}>{children}</Text>
    //           ),
    //           a: ({ children, href }) => (
    //             <Link src={href!} style={tw("text-blue-500 prose")}>
    //               {children}
    //             </Link>
    //           ),
    //         }}
    //       >
    //         {coverLetter}
    //       </Markdown>
    //     </View>
    //   </Page>
    // </Document>
  );
};

export default CoverLetter;

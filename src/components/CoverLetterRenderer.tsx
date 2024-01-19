"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useContext } from "react";
import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { Loader } from "lucide-react";
import MarkDown from "react-markdown";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {},
  },
});

const CoverLetterRenderer = () => {
  const { fileId } = useContext(ResumeContext);
  console.log(fileId);
  const { ref, height } = useResizeDetector();
  const { data: coverLetter, isLoading } = trpc.getCoverLetter.useQuery({
    fileId,
  });

  if (isLoading) {
    return (
      <Loader className="flex items-center justify-center w-8 h-8 text-slate-600 my-44 mx-44 animate-spin" />
    );
  }
  return (
    <div className="w-full min-h-screen">
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref}>
          <Document>
            <Page
              size="A4"
              style={tw("p-12 flex flex-col border border-slste-600")}
            >
              <View style={tw(" bg-white")}>
                <Text style={tw("text-custom text-xl")}>
                  <MarkDown>{coverLetter?.text}</MarkDown>
                </Text>
              </View>
            </Page>
          </Document>
        </div>
      </SimpleBar>
    </div>
  );
};

export default CoverLetterRenderer;

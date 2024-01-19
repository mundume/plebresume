"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useContext } from "react";
import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { ResumeContext } from "./Provider";
import { trpc } from "@/app/_trpc/client";
import { Loader } from "lucide-react";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

const CoverLetterRenderer = () => {
  const { fileId } = useContext(ResumeContext);
  console.log(fileId);
  const { ref, height } = useResizeDetector();
  const { data: coverLetter, isLoading } = trpc.getCoverLetter.useQuery({
    fileId,
  });

  if (!coverLetter) return null;
  return (
    <div className="w-full min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader className="w-12 h-12 text-slate-600" />
        </div>
      ) : (
        <div> {coverLetter?.text} </div>
      )}
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref}>
          <Document>
            <Page size="A4" style={tw("p-12 flex flex-col")}>
              <View style={tw("p-20 bg-gray-100")}>
                <Text style={tw("text-custom text-3xl")}></Text>
              </View>
              <View style={tw("mt-12 px-8 rotate-2")}>
                <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
              </View>
            </Page>
          </Document>
        </div>
      </SimpleBar>
    </div>
  );
};

export default CoverLetterRenderer;

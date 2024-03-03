"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useCoverLetterContext } from "./Provider";
import { useResumeBuilderContext } from "./resume-builder-context";

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
const ResumePreviewer = () => {
  const { values } = useResumeBuilderContext();
  const { ref, height } = useResizeDetector();

  const { address, email, names, phone, profile } = values.personalInfo;
  return (
    <div className="block w-full min-h-screen">
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref}>
          <Document style={tw("h-full")}>
            <Page
              size="A4"
              style={tw("flex flex-col border p-6 text-slate-800 ")}
              wrap={false}
            >
              <View style={tw("flex flex-col gap-2")}>
                <Text style={tw("flex gap-4")}>
                  <Text style={tw(" text-5xl font-bold")}>
                    {names.firstName}
                  </Text>
                  <Text style={tw(" text-5xl font-bold")}>
                    {names.lastName}
                  </Text>
                </Text>

                <Text style={tw("t")}>{email}</Text>
                <Text style={tw("t")}>{phone}</Text>
                <Text style={tw("")}>
                  {address.city}
                  {address.state && ","} {address.state}
                </Text>
                <Text style={tw("py-4 text-slate-600")}>{profile}</Text>
              </View>
              <View style={tw("mt-12 px-8 rotate-2")}></View>
            </Page>
          </Document>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ResumePreviewer;

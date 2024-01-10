"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";

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
  const { ref, height } = useResizeDetector();
  return (
    <div className="w-full min-h-screen">
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref}>
          <Document>
            <Page size="A4" style={tw("p-12 flex flex-col")} wrap={false}>
              <View style={tw("p-20 bg-gray-100")}>
                <Text style={tw("text-custom text-3xl")}>Section #1</Text>
              </View>
              <View style={tw("mt-12 px-8 rotate-2")}>
                <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
              </View>
              <View style={tw("p-20 bg-gray-100")}>
                <Text style={tw("text-custom text-3xl")}>Section #1</Text>
              </View>
              <View style={tw("mt-12 px-8 rotate-2")}>
                <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
              </View>
              <View style={tw("p-20 bg-gray-100")}>
                <Text style={tw("text-custom text-3xl")}>Section #1</Text>
              </View>
              <View style={tw("mt-12 px-8 rotate-2")}>
                <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
              </View>
              <View style={tw("p-20 bg-gray-100")}>
                <Text style={tw("text-custom text-3xl")}>Section #1</Text>
              </View>
              <View style={tw("mt-12 px-8 rotate-2")}>
                <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
              </View>
              <View style={tw("p-20 bg-gray-100")}>
                <Text style={tw("text-custom text-3xl")}>Section #1</Text>
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

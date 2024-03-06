"use client";
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
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useCoverLetterContext } from "./Provider";
import { useResumeBuilderContext } from "./resume-builder-context";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
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
  console.log(values.workExperience);

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
                <Text style={tw("text-3xl flex gap-2 font-semibold")}>
                  <Text style={tw("")}>{names.firstName}</Text>
                  <Text style={tw("")}>{names.lastName}</Text>
                </Text>

                <Text style={tw("flex")}>
                  {/* {email.length !== 0 && (
                    <Svg
                      style={tw("text-slate-600")}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      // class="lucide lucide-mail"
                    >
                      <Rect width="20" height="16" x="2" y="4" rx="2" />
                      <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </Svg>
                  )} */}
                  {email}
                </Text>
                <Text>{phone}</Text>
                <Text>
                  {address.city}
                  {address.state && ","} {address.state}
                </Text>
                <Text style={tw("py-4 text-slate-600 text-xl")}>{profile}</Text>
              </View>
              <View style={tw("mt-12 px-8 border")}>
                {values.workExperience.map((item, index) => (
                  <div key={index}>
                    <Text>{item.companyName}</Text>
                    <Text>{item.title}</Text>
                    <Text>
                      {item.startDate} - {item.endDate}
                    </Text>
                    <Text>{item.description}</Text>
                  </div>
                ))}
              </View>
            </Page>
          </Document>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ResumePreviewer;

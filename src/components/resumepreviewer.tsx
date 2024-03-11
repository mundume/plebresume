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

  const { address, email, names, phone, profile } = values.personalInfo;
  return (
    <div className="block w-full min-h-screen">
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref} className="">
          <Document style={tw("h-full")}>
            <Page
              size="A4"
              style={tw(" flex flex-col text-slate-800 ")}
              wrap={false}
            >
              <Text style={tw("flex flex-col gap-2 p-6")}>
                <Text style={tw("text-3xl flex gap-2 font-semibold")}>
                  <Text style={tw("")}>{names.firstName}</Text>
                  <Text style={tw("")}>{names.lastName}</Text>
                </Text>

                <Text style={tw("flex")}>{email}</Text>
                <Text>{phone}</Text>
                <Text>
                  {address.city}
                  {address.state && ","} {address.state}
                </Text>
                <Text style={tw("py-4 text-slate-600 text-xl")}>{profile}</Text>
              </Text>

              {/* work experience */}

              <Text style={tw("mt-6 px-8 text-lg ")}>
                <Text>
                  {values.workExperience?.map((item, index) => (
                    <View key={index} style={tw("flex flex-col")}>
                      <Text style={tw("flex flex-col")}>
                        <Text style={tw("text-xl font-medium")}>
                          {item.title}
                        </Text>
                        <Text style={tw("")}>{item.companyName}</Text>
                        <Text>
                          {item.startDate} {item.endDate !== "" && "to"}{" "}
                          {item.endDate}
                        </Text>
                      </Text>
                      <Text>{item.description}</Text>
                    </View>
                  ))}
                </Text>
              </Text>
            </Page>
          </Document>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ResumePreviewer;

import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import React from "react";
import Markdown from "react-markdown";
import { createTw } from "react-pdf-tailwind";
import { initialState } from "./resume-builder-context";

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
const source = `http://fonts.gstatic.com/s/risque/v4/iFA7a9Hk8IxDgPVBx7IE_Q.ttf`;

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    flex: "column",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Resume = ({ values }: { values: initialState }) => {
  const { address, email, names, phone, profile } = values.personalInfo;
  const components = {
    // p: ({ children }: { children: React.ReactNode }) => (
    //   <Text style={tw("")}>{children}</Text>
    // ),
    // strong: ({ children }: { children: React.ReactNode }) => (
    //   <Text style={tw("font-bold")}>{children}</Text>
    // ),
    // hr: () => <View style={tw("border-t border-gray-200 my-4")}></View>,
    ol: ({ children }: { children: React.ReactNode }) => (
      <View style={tw("prose list-disc")}> {children}</View>
    ),
    // ul: ({ children }: { children: React.ReactNode }) => (
    //   <View style={tw("list-disc")}>{children}</View>
    // ),
    // li: ({ children }: { children: React.ReactNode }) => (
    //   <Text style={tw("")}>• &nbsp;{children}</Text>
    // ),
    // h1: ({ children }: { children: React.ReactNode }) => (
    //   <Text style={tw("text-4xl font-bold")}>{children}</Text>
    // ),
  };
  return (
    <Document style={tw("h-full")}>
      <Page size="A4" style={tw("flex flex-col")} wrap={false}>
        <Text style={styles.text}>
          <Text style={styles.title}>
            <Text style={tw("text-4xl font-bold")}>{names.firstName}</Text>
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
              <View key={index} style={tw("flex flex-col prose")}>
                <Text style={tw("flex flex-col")}>
                  <Text style={tw("text-xl font-medium")}>{item.title}</Text>
                  <Text style={tw("")}>{item.companyName}</Text>
                  <Text style={tw("text-slate-400")}>
                    {item.startDate} {item.endDate !== "" && "-"} {item.endDate}
                  </Text>
                </Text>
                <Text>{item.description}</Text>
              </View>
            ))}
          </Text>
        </Text>
      </Page>
    </Document>
  );
};
export default Resume;

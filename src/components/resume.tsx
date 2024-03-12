"use client";
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
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

Font.register({ family: "Roboto", src: source });

// Reference font
const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto",
  },
});

const Resume = ({ values }: { values: initialState }) => {
  const { address, email, names, phone, profile } = values.personalInfo;

  return (
    <Document style={styles.title}>
      <Page
        size="A4"
        wrap={false}
        style={tw("flex flex-col text-base p-6 bg-white/90")}
      >
        <View style={tw("flex flex-col")}>
          <View style={tw(" flex flex-row text-3xl font-bold")}>
            <Text style={tw("mr-2")}>{names.firstName}</Text>
            <Text style={tw("mr-2")}>{names.lastName}</Text>
          </View>

          <Text>{email}</Text>
          <Text>{phone}</Text>
          <Text>
            {address.city}
            {address.state && ","} {address.state}
          </Text>
          <Text style={tw("mt-4")}>{profile}</Text>
        </View>

        {/* work experience */}

        <Text>
          <Text>
            {values.workExperience?.map((item, index) => (
              <View key={index} style={tw("flex flex-col")}>
                <Text style={tw("flex flex-col")}>
                  <Text>{item.title}</Text>
                  <Text>{item.companyName}</Text>
                  <Text>
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

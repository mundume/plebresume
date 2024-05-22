"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useResumeBuilderContext } from "./resume-builder-context";
import { format } from "date-fns";

const ResumePreviewer = () => {
  const { values, currentValues } = useResumeBuilderContext();
  const { ref, height } = useResizeDetector();

  const { address, email, names, phone, profile, proffession } =
    values.personalInfo;
  const {
    companyName,
    description,
    endDate,
    startDate,
    title,
    currentlyWorking,
  } = currentValues;
  const l = startDate
    ? format(startDate, "MMM, yyyy")
    : endDate
    ? format(endDate, "MMM, yyyy")
    : "";
  return (
    <div className="items-center block w-full min-h-screen p-10 m-auto shadow-2xl">
      <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
        <div ref={ref} className="pb-10 font-sans text-slate-800">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-4xl font-bold">
                {names.firstName} {names.lastName}
              </h1>
              <span className="p-2 text-xl border rounded-full ">NK</span>
            </div>
            <p className="py-4 font-semibold">{proffession}</p>
          </div>
          <div className="flex">
            <div className="flex-1">
              <p className="flex text-sm text-slate-600">
                {" "}
                <span className="flex-1 font-bold  text-blue-400">
                  email
                </span>{" "}
                <span className="flex-1">{email}</span>
              </p>
              <p className="flex text-sm text-slate-600">
                {" "}
                <span className="flex-1 font-bold  text-blue-400">
                  phone
                </span>{" "}
                <span className="flex-1">{phone}</span>
              </p>
            </div>
            <div className="flex-1">
              <p className="flex text-sm text-slate-600">
                <span className="flex-1 font-bold text-blue-400">Address</span>
                <span className="flex-1">
                  {address.city}
                  {address.state && ","} {address.state}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="flex text-sm text-slate-600">
            <p className="pr-5 text-xl font-bold text-slate-800 ">
              <span className="pr-1 underline">01</span>
              Profile
            </p>
            <span className="">{profile}</span>
          </p>
        </div>
        <div className="py-4">
          <p className="pr-5 text-xl font-bold text-slate-800 ">
            <span className="pr-1 underline">02</span>
            Work Experience
          </p>
          <div>
            <div className="flex items-center justify-between">
              <p className="flex text-sm font-mono font-medium text-blue-500">
                {l} -{" "}
                {currentlyWorking
                  ? "Present"
                  : endDate
                  ? format(endDate, "MMMM/yyyy")
                  : ""}
              </p>
              <p className="font-semibold">{companyName}</p>
              <p className="font-semibold"> {title}</p>
            </div>
            <Markdown className="px-4 prose">{description}</Markdown>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ResumePreviewer;

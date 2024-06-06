"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useResumeBuilderContext } from "./resume-builder-context";
import { format } from "date-fns";
import { json } from "stream/consumers";

const ResumePreviewer = () => {
  const { values, currentValues, form } = useResumeBuilderContext();
  const { ref, height } = useResizeDetector();

  const { address, email, names, phone, profile, proffession } =
    values.personalInfo;
  const k = form.watch("experience");
  return (
    <div className="items-center block w-full h-full p-10 m-auto shadow-2xl">
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
            <span className="pr-1 underline text-blue-400">01</span>
            Profile
          </p>
          <span className="">{profile}</span>
        </p>
      </div>
      <div className="py-4">
        <p className="pr-5 text-xl font-bold text-slate-800 ">
          <span className="pr-1 underline text-blue-400">02</span>
          Work Experience
        </p>
        <div>
          {k.map((item, index) => (
            <div key={index} className="flex justify-between  my-4">
              {
                <div className="flex gap-2 text-sm text-blue-400 font-mono">
                  {item.startDate && (
                    <p>
                      {format(new Date(item?.startDate) || "", "MMM, yyyy")}
                    </p>
                  )}
                  -{" "}
                  <p>
                    {" "}
                    {item.currentlyWorking
                      ? "Present"
                      : item.endDate &&
                        format(new Date(item?.endDate!) || "", "MMM, yyyy")}
                  </p>
                </div>
              }
              <div className="">
                <div
                  className="flex gap-2 font-sans text-slate-800 items-center
                  "
                >
                  <h2 className="font-semibold ">{item?.title}</h2>{" "}
                  {item?.companyName && <p className="text-base">at</p>}
                  <h2 className="font-semibold text-blue-400">
                    {item?.companyName}
                  </h2>
                </div>
                <Markdown className={"prose text-sm"}>
                  {item?.description}
                </Markdown>
              </div>
              <div className=""></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewer;

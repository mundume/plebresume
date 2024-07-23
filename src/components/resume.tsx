import React from "react";
import { type Resume } from "@/config/types";
import { Tailwind } from "@onedoc/react-print";
import { format } from "date-fns";

const Resume = (resume: Resume) => {
  return (
    <Tailwind>
      <div className="p-2 bg-white w-full font-sans text-sm">
        <header className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800 font-sans">
            {resume.firstName} {resume.lastName}
          </h1>
          <p className="text-gray-600 font-sans">
            {resume.city}, {resume.state}
          </p>
          <p className="text-gray-600 font-sans text-sm">
            {resume.phone} | {resume.email}
          </p>
        </header>

        <section className="mb-2">
          <p className="text-gray-700 font-sans text-sm">{resume.profile}</p>
        </section>

        <section className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 font-sans">
            Work Experience
          </h2>

          {resume.workExperience?.map((job, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                {job.title}
              </h3>
              <p className="text-gray-600">
                {job.name}, {job.location} |{" "}
                {format(job?.startDate || "", "MMM yyyy")} to{" "}
                {job.currently
                  ? "Present"
                  : format(job.endDate || "", "MMM yyyy")}
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {job?.description?.split("\n").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
          <ul className="grid grid-cols-2 gap-1">
            {resume.skills?.map((skill, index) => (
              <li key={index} className=" p-1 rounded">
                {skill.skills} - {skill.level} years
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Education
          </h2>
          {resume.education?.map((edu, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-700">
                {edu.name}
              </h3>
              <p className="text-gray-600">
                {edu.title} | {format(edu.startDate || "", "MMM yyyy")} - to{" "}
                {edu.currently
                  ? "Present"
                  : format(edu.endDate || "", "MMM yyyy")}
              </p>
            </div>
          ))}
        </section>
      </div>
    </Tailwind>
  );
};

export default Resume;

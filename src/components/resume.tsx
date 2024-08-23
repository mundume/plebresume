import React from "react";
import { type Resume } from "@/config/types";
import { PageTop, Tailwind, Markdown } from "@onedoc/react-print";
import { format } from "date-fns";

const Resume = (resume: Resume) => {
  return (
    <Tailwind>
      <PageTop>
        <div className="flex items-center gap-2 justify-center w-full mt-5">
          <div className=" flex items-center gap-2 justify-center w-full text-sm">
            <p className="font-semibold">socials : </p>
            {resume?.socialLinks?.map((link, index) => (
              <a
                href={link.link!}
                key={index}
                target="_blank"
                className=" underline-offset-4 hover:underline underline mr-2"
              >
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </PageTop>
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
                {job?.description
                  ?.split("\n")
                  .filter((item) => item.trim() !== "")
                  .map((item, i) => (
                    <li key={i}>{item.replace(/^\*\s?/, "")} </li>
                  ))}
              </ul>
            </div>
          ))}
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
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {edu?.description
                  ?.split("\n")
                  .filter((item) => item.trim() !== "")
                  .map((item, i) => (
                    <li key={i}>{item.replace(/^\*\s?/, "")} </li>
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
      </div>
    </Tailwind>
  );
};

export default Resume;

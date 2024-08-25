"use client";
import Markdown from "react-markdown";

import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { useResumeBuilderContext } from "./resume-builder-context";
import { format } from "date-fns";
import { db } from "@/config/prisma";
import { useEffect } from "react";

const ResumePreviewer = () => {
  const {
    values,
    form,
    educationForm,
    socialLinkForm,
    skillsForm,
    hobbiesForm,
    languageForm,
    personalInfoForm,

    userId,
  } = useResumeBuilderContext();
  const { ref, height } = useResizeDetector();

  const personalInfo = personalInfoForm.watch("resume");

  const workExperience = form.watch("experience");
  const education = educationForm.watch("education");
  const socialLinks = socialLinkForm.watch("socialLinks");
  const skills = skillsForm.watch("skills");
  const hobbies = hobbiesForm.watch("hobbies");
  const languages = languageForm.watch("languages");

  return (
    <div className="w-full md:w-5/12 md:fixed md:right-10 p-4 md:p-0 h-screen">
      <div className="w-full p-4 md:p-10 m-auto shadow-2xl min-h-screen bg-white">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-2rem)]">
          <div className="font-sans text-slate-800">
            <header className="mb-6">
              <div className="flex flex-wrap items-center justify-center w-full text-xs mb-2">
                <p className="font-semibold mr-2">Links : </p>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xs underline-offset-4 hover:underline underline mr-2 mb-1"
                  >
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-lg md:text-xl font-bold">
                  {personalInfo.names?.firstName} {personalInfo.names?.lastName}
                </h1>
                <span className="p-1 border rounded-full text-xs">
                  {personalInfo.names?.firstName?.[0]}
                  {personalInfo.names?.lastName?.[0]}
                </span>
              </div>
              <p className="py-1 font-semibold text-sm">
                {personalInfo.proffession}
              </p>
              <div className="flex flex-col md:flex-row text-xs">
                <div className="flex-1 mb-2 md:mb-0">
                  <p className="flex text-slate-600">
                    <span className="w-1/3 font-bold">email</span>
                    <span className="w-2/3">{personalInfo.email}</span>
                  </p>
                  <p className="flex text-slate-600">
                    <span className="w-1/3 font-bold">phone</span>
                    <span className="w-2/3">{personalInfo.phone}</span>
                  </p>
                </div>
                <div className="flex-1">
                  <p className="flex text-slate-600">
                    <span className="w-1/3 font-bold">Address</span>
                    <span className="w-2/3">
                      {personalInfo.address?.city}
                      {personalInfo.address?.state &&
                        `, ${personalInfo.address.state}`}
                    </span>
                  </p>
                </div>
              </div>
            </header>

            <section className="mb-6">
              <h2 className="text-base font-bold text-slate-800 mb-2">
                <span className="pr-1 underline">01</span>
                Profile
              </h2>
              <p className="text-xs text-slate-600">{personalInfo.profile}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-base font-bold text-slate-800 mb-2">
                <span className="pr-1 underline">02</span>
                Work Experience
              </h2>
              {workExperience?.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-3">
                    <div className="text-xs text-slate-600 order-1 md:order-none">
                      {job.startDate &&
                        format(new Date(job.startDate), "MMM, yyyy")}{" "}
                      -{" "}
                      {job.currently
                        ? "Present"
                        : job.endDate &&
                          format(new Date(job.endDate), "MMM, yyyy")}
                    </div>
                    <div className="flex-1 order-3 md:order-none">
                      <div className="flex flex-wrap gap-1 md:gap-2 items-center">
                        <h3 className="text-xs font-semibold">{job.title}</h3>
                        {job.name && <p className="text-xs">at</p>}
                        <p className="text-xs font-semibold">{job.name}</p>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        <Markdown className={"prose text-xs"}>
                          {job.description}
                        </Markdown>
                      </p>
                    </div>
                    <div className="text-xs text-slate-600 order-2 md:order-none md:text-right">
                      {job.location}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mb-6">
              <h2 className="text-base font-bold text-slate-800 mb-2">
                <span className="pr-1 underline">03</span>
                Education
              </h2>
              {education?.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-3">
                    <div className="text-xs text-slate-600 order-1 md:order-none">
                      {edu.startDate &&
                        format(new Date(edu.startDate), "MMM, yyyy")}{" "}
                      -{" "}
                      {edu.currently
                        ? "Present"
                        : edu.endDate &&
                          format(new Date(edu.endDate), "MMM, yyyy")}
                    </div>
                    <div className="flex-1 order-3 md:order-none">
                      <div className="flex flex-wrap gap-1 md:gap-2 items-center">
                        <h3 className="text-xs font-semibold">{edu.title}</h3>
                        {edu.name && <p className="text-xs">at</p>}
                        <p className="text-xs font-semibold">{edu.name}</p>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        <Markdown className={"prose text-xs"}>
                          {edu.description}
                        </Markdown>
                      </p>
                    </div>
                    <div className="text-xs text-slate-600 order-2 md:order-none md:text-right">
                      {edu.location}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mb-6">
              <h2 className="text-base font-bold text-slate-800 mb-2">
                <span className="pr-1 underline">04</span>
                Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex gap-2 text-xs text-slate-600"
                  >
                    <span>{skill.skills}</span>
                    {skill.level && <span>({skill.level} years)</span>}
                  </div>
                ))}
              </div>
            </section>
            <section className="mb-6">
              <h2 className="text-base font-bold text-slate-800 mb-2">
                <span className="pr-1 underline">04</span>
                Languages
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {languages.map((skill, index) => (
                  <div
                    key={index}
                    className="flex gap-2 text-xs text-slate-600"
                  >
                    <span>{skill.languages}</span>
                    {skill.level && <span>({skill.level})</span>}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-44">
              <h2 className="text-base font-bold text-slate-800 mb-2">
                <span className="pr-1 underline">05</span>
                Hobbies
              </h2>
              <p className="text-xs text-slate-600">{hobbies}</p>
            </section>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default ResumePreviewer;

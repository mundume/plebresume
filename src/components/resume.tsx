import { type Resume } from "@/config/types";
import { Tailwind, PageTop, Markdown } from "@onedoc/react-print";
import { format } from "date-fns";

const Resume = (resume: Resume) => {
  return (
    <Tailwind>
      <PageTop>
        <div className=" flex items-center gap-2 justify-center w-full text-sm">
          <p className="font-semibold">Links : </p>
          {resume?.socialLinks.map((link, index) => (
            <a
              href={link.link ? link.link : "#"}
              key={index}
              target="_blank"
              className="text-primary text-sm underline-offset-4 hover:underline underline mr-2"
            >
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </PageTop>
      <div className="w-full">
        <div className=" font-sans text-slate-800">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-bold">
                {resume?.firstName} {resume?.lastName}
              </h1>
              <span className="p-1 border rounded-full ">NK</span>
            </div>
            <p className="py-1 font-semibold text-sm ">{resume?.profession}</p>
          </div>
          <div className="flex text-sm">
            <div className="flex-1">
              <p className="flex  text-slate-600 ">
                {" "}
                <span className="flex-1 font-bold  text-blue-400">
                  email
                </span>{" "}
                <span className="flex-1">{resume?.email}</span>
              </p>
              <p className="flex  text-slate-600 ">
                {" "}
                <span className="flex-1 font-bold  text-blue-400">
                  phone
                </span>{" "}
                <span className="flex-1">{resume?.phone}</span>
              </p>
            </div>
            <div className="flex-1">
              <p className="flex  text-slate-600 ">
                <span className="flex-1 font-bold text-blue-400">Address</span>
                <span className="flex-1">
                  {resume?.city} {resume?.state}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex text-slate-600 text-sm py-1">
            <p className="pr-5 text-xl font-bold text-slate-800 ">
              <span className="pr-1 underline text-blue-400">01</span>
              Profile
            </p>
            <p className="">{resume?.profile}</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="pr-5 text-xl font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">02</span>
            Work Experience
          </p>
          <div>
            {resume.workExperience?.map((item, index) => (
              <div key={index} className="flex justify-between gap-3  ">
                <div className=" col-span-3  flex  gap-2 text-sm text-blue-400   ">
                  {item.startDate && (
                    <p className=" text-sm">
                      {format(new Date(item?.startDate) || "", "MMM, yyyy")}
                    </p>
                  )}
                  -{" "}
                  <p className=" text-sm ">
                    {item.currently
                      ? "Present"
                      : item.endDate &&
                        format(new Date(item?.endDate!) || "", "MMM, yyyy")}
                  </p>
                </div>

                <div className="  text-base">
                  <div
                    className="flex  gap-2 font-sans text-slate-800 items-center
                  "
                  >
                    <h2 className="font-semibold text-base  ">{item?.title}</h2>{" "}
                    <p className=" mx-2 ">at</p>
                    <h2 className="font-semibold text-blue-400 ">
                      {item?.name}
                    </h2>
                  </div>

                  <div className="text-slate-600 text-sm">
                    {item.description?.split("\n").map((item, index) => (
                      <ul key={index}>
                        <li key={index}>{item}</li>
                      </ul>
                    ))}
                  </div>
                </div>
                <div className="text-slate-600 font-mono text-sm  col-span-2 text-center">
                  {item.location}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-1">
          <p className="pr-5 text-xl font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">03</span>
            Education
          </p>
          <div>
            {resume.education?.map((item, index) => (
              <div key={index} className=" flex justify-between gap-3  ">
                <div className=" col-span-3  flex  gap-2 text-sm text-blue-400">
                  {item.startDate && (
                    <p className=" text-sm">
                      {format(new Date(item?.startDate) || "", "MMM, yyyy")}
                    </p>
                  )}
                  <p className="mx-2">-</p>
                  <p className=" text-sm ">
                    {item.currently
                      ? "Present"
                      : item.endDate &&
                        format(new Date(item?.endDate!) || "", "MMM, yyyy")}
                  </p>
                </div>

                <div className=" col-span-7 text-sm">
                  <div
                    className="flex  gap-2 font-sans text-slate-800 items-center
                  "
                  >
                    <h2 className="font-semibold ">{item?.title}</h2>{" "}
                    {item?.name && <p className=" mx-2 ">at</p>}
                    <h2 className="font-semibold  text-blue-400">
                      {item?.name}
                    </h2>
                  </div>
                  <div className="text-slate-600 text-sm">
                    {item.description?.split("\n").map((item, index) => (
                      <ul key={index}>
                        <li key={index}>{item}</li>
                      </ul>
                    ))}
                  </div>
                </div>
                <div className="text-slate-600 font-mono text-sm col-span-2 text-center">
                  {item.location}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <p className="pr-5 text-base font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">04</span>
            Skills
          </p>
          <div className=" flex flex-col ">
            {resume?.skills?.map((item, index) => (
              <div key={index} className="flex">
                <p className="text-slate-600 text-sm mr-1">
                  {item?.skills && `- ${item?.skills}`}
                </p>
                <p className="text-blue-400 text-sm ml-1">
                  {item?.level && `${item?.level} years`}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="py-1">
          <p className="pr-5 text-base font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">05</span>
            Hobbies
          </p>
          <div className=" grid grid-cols-2">
            <p>
              <p className="text-slate-600 text-sm">{resume?.hobbies}</p>
            </p>
          </div>
        </div>
        <div className="">
          <p className="pr-5 text-base font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">05</span>
            Languages
          </p>
          <div className="">
            {resume?.languages?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <p className="text-slate-600 text-sm">{item?.languages}</p>
                <p className="text-blue-400 text-sm mx-2">{item?.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Tailwind>
  );
};
export default Resume;

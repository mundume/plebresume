import { type Resume } from "@/config/types";
import { Tailwind, PageTop, Markdown } from "@onedoc/react-print";
import { format } from "date-fns";

const Resume = (resume: Resume) => {
  return (
    <Tailwind>
      <PageTop>
        <div className=" flex items-center gap-2 justify-center w-full text-xs">
          <p className="font-semibold">Links : </p>
          {resume?.socialLinks.map((link, index) => (
            <a
              href={link.link ? link.link : "#"}
              key={index}
              target="_blank"
              className="text-primary text-xs underline-offset-4 hover:underline underline mr-2"
            >
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </PageTop>
      <div className="i ">
        <div className=" font-sans text-slate-800">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-bold">
                {resume?.firstName} {resume?.lastName}
              </h1>
              <span className="p-1 border rounded-full ">NK</span>
            </div>
            <p className="py-1 font-semibold text-sm ">{resume?.profession}</p>
          </div>
          <div className="flex text-xs">
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
          <div className="flex text-slate-600 text-xs py-1">
            <p className="pr-5 text-base font-bold text-slate-800 ">
              <span className="pr-1 underline text-blue-400">01</span>
              Profile
            </p>
            <p className="">{resume?.profile}</p>
          </div>
        </div>
        <div className="">
          <p className="pr-5 text-base font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">02</span>
            Work Experience
          </p>
          <div>
            {resume.workExperience?.map((item, index) => (
              <div
                key={index}
                className="grid  grid-cols-12 my-4  items-start  "
              >
                <div className=" col-span-3  flex  gap-2 text-xs text-blue-400   ">
                  {item.startDate && (
                    <p className=" text-xs">
                      {format(new Date(item?.startDate) || "", "MMM, yyyy")}
                    </p>
                  )}
                  -{" "}
                  <p className=" text-xs ">
                    {item.currently
                      ? "Present"
                      : item.endDate &&
                        format(new Date(item?.endDate!) || "", "MMM, yyyy")}
                  </p>
                </div>

                <div className=" col-span-7 text-xs">
                  <div
                    className="flex  gap-2 font-sans text-slate-800 items-center
                  "
                  >
                    <h2 className="font-semibold ">{item?.title}</h2>{" "}
                    {item?.name && <p className="">at</p>}
                    <h2 className="font-semibold text-blue-400">
                      {item?.name}
                    </h2>
                  </div>
                  <Markdown className={"prose text-xs "}>
                    {`${item?.description}`}
                  </Markdown>
                </div>
                <div className="text-slate-600 font-mono text-xs  col-span-2 text-center">
                  {item.location}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-1">
          <p className="pr-5 text-base font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">03</span>
            Education
          </p>
          <div>
            {resume.education?.map((item, index) => (
              <div
                key={index}
                className="grid  grid-cols-12 my-4 gap-6 items-start "
              >
                <div className=" col-span-3  flex  gap-2 text-xs text-blue-400">
                  {item.startDate && (
                    <p className=" text-xs">
                      {format(new Date(item?.startDate) || "", "MMM, yyyy")}
                    </p>
                  )}
                  -
                  <p className=" text-xs ">
                    {item.currently
                      ? "Present"
                      : item.endDate &&
                        format(new Date(item?.endDate!) || "", "MMM, yyyy")}
                  </p>
                </div>

                <div className=" col-span-7 text-xs">
                  <div
                    className="flex  gap-2 font-sans text-slate-800 items-center
                  "
                  >
                    <h2 className="font-semibold ">{item?.title}</h2>{" "}
                    {item?.name && <p className="">at</p>}
                    <h2 className="font-semibold  text-blue-400">
                      {item?.name}
                    </h2>
                  </div>
                  <Markdown>{`${item?.description!}`}</Markdown>
                </div>
                <div className="text-slate-600 font-mono text-xs col-span-2 text-center">
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
          <div className=" grid grid-cols-3">
            {resume?.skills?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <p className="text-slate-600 text-xs">
                  {item?.skills && `- ${item?.skills}`}
                </p>
                <p className="text-slate-600 text-xs">
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
              <p className="text-slate-600 text-xs">{resume?.hobbies}</p>
            </p>
          </div>
        </div>
        <div className="">
          <p className="pr-5 text-base font-bold text-slate-800 ">
            <span className="pr-1 underline text-blue-400">05</span>
            Languages
          </p>
          <div className=" grid grid-cols-3 place-content-center">
            {resume?.languages?.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-center justify-center"
              >
                <p className="text-slate-600 text-xs">{item?.languages}</p>
                <p className="text-blue-400 text-xs">{item?.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Markdown>{`- Item 1
* Item 2
  - Subitem 1
  - Subitem 2
- Item 3
`}</Markdown>
    </Tailwind>
  );
};
export default Resume;

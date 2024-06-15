import { Tailwind, PageTop } from "@onedoc/react-print";

const Resume = ({
  values,
}: {
  values: {
    personalInfo: {
      names: {
        firstName: string;
        lastName: string;
      };
      email: string;
      proffession: string;
      phone: string;
      profile: string;
      address: {
        city: string;
        state: string;
      };
    };
  };
}) => {
  return (
    <Tailwind>
      <PageTop>
        <div>
          <h2 className="pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0">
            U andd IIIII
          </h2>
          <a
            href="https://www.linkedin.com/jobs/"
            className="pb-2  font-semibold tracking-tight scroll-m-20 first:mt-0"
          >
            linkedin
          </a>
        </div>
      </PageTop>
      <div className="font-sans text-slate-800">
        <div className="flex flex-col ">
          <div className="flex items-center justify-between w-full pb-8">
            <h1 className="text-4xl font-bold">
              {values.personalInfo.names.firstName}{" "}
              {values.personalInfo.names.lastName}
            </h1>
            <span className="p-2 text-xl border rounded-full ">NK</span>
          </div>
          {/* <p className="py-4 font-semibold">{values.personalInfo.profile}</p> */}
        </div>
        <div className="flex">
          <div className="flex-1">
            <p className="flex text-sm text-slate-600">
              {" "}
              <span className="flex-1 font-bold ">email</span>{" "}
              <span className="flex-1">{values.personalInfo.email}</span>
            </p>
            <p className="flex text-sm text-slate-600">
              {" "}
              <span className="flex-1 font-bold ">phone</span>{" "}
              <span className="flex-1">{values.personalInfo.phone}</span>
            </p>
          </div>
          <div className="flex-1">
            <p className="flex text-sm text-slate-600">
              <span className="flex-1 font-bold">Address</span>
              <span className="flex-1">
                {values.personalInfo.address.city},{" "}
                {values.personalInfo.address.state}
              </span>
            </p>
          </div>
        </div>
        <div className="flex py-6 ">
          <p className="flex text-sm text-slate-600">
            <p className="pr-5 text-xl font-bold text-slate-800 ">
              <span className="pr-1 underline">01</span>
              Profile
            </p>
            <span className="">{values.personalInfo.profile}</span>
          </p>
        </div>
      </div>
    </Tailwind>
  );
};
export default Resume;

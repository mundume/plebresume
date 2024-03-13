import { Footnote, Tailwind, Markdown } from "@onedoc/react-print";
import { initialState } from "./resume-builder-context";

export const Receipt = ({ personalInfo, workExperience }: initialState) => (
  <Tailwind>
    <Markdown
      className="text-slate-800"
      options={{
        overrides: {
          Heading: {
            component: ({ children }) => (
              <h1 className="text-4xl font-bold text-blue-400">{children}</h1>
            ),
          },
          Profile: {
            component: ({ children }) => (
              <p className="px-2 py-4 bg-slate-100 ">{children}</p>
            ),
          },
        },
      }}
    >
      {`<Heading> ${personalInfo.names.firstName} ${personalInfo.names.lastName} </Heading>

# ${personalInfo.email}
# ${personalInfo.phone}
# ${personalInfo.address.city}
# ${personalInfo.address.state}
# <Profile>${personalInfo.profile} </Profile>

`}
    </Markdown>
    <div className="flex justify-between">
      <h1 className="text-lg font-bold text-blue-400 border-b">
        Work Experience
      </h1>
      <h1 className="text-lg font-bold text-blue-400 border-b">
        Work Experience
      </h1>
    </div>

    {workExperience.map((item, index) => (
      <div key={index} className="text-sm text-slate-800">
        <h3 className="text-base font-bold ">{item.title}</h3>
        <p className="flex gap-2 py-1 text-sm text-slate-600">
          <span className="mr-2">{item.startDate}</span>
          <span> to </span> <span className="ml-2">{item.endDate}</span>
        </p>
        <p className="font-medium">{item.companyName}</p>

        <div className="text-sm">{item.description}</div>
      </div>
    ))}
  </Tailwind>
);

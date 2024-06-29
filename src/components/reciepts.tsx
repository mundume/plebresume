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
  </Tailwind>
);

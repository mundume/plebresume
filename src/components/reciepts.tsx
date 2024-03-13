import { Footnote, Tailwind } from "@onedoc/react-print";

export const Receipt = ({
  id,
  date,
  total,
}: {
  id: number;
  date: string;
  total: number;
}) => (
  <Tailwind>
    <div className="font-sans">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 -z-10 absolute -left-[2cm] right-[25vw] -skew-y-12 h-[100vh] bottom-[95vh]" />
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 -z-20 absolute left-[75vw] -right-[2cm] -skew-y-12 h-[100vh] bottom-[90vh]" />
      <div className="bg-slate-100 -rotate-12 -z-10 absolute -left-[200em] -right-[200em] h-[100vh] top-[75vh]" />
      <main className="text-slate-800 pt-24 h-[90vh] flex flex-col">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
          className="w-32 mx-auto mb-12 fill-blue-800"
        >
          <g>
            <path
              d="M22.45,12.12c0-2.91-0.99-5.33-3.03-7.34C17.42,2.76,14.96,1.74,12,1.74c-2.93,0-5.4,1.02-7.43,3.05
            C2.56,6.8,1.55,9.26,1.55,12.15c0,0.84,0.11,1.63,0.27,2.37l9.71-7.65h5.01v14.58c1.06-0.5,2.03-1.13,2.91-1.99
            C21.46,17.45,22.45,15.01,22.45,12.12z"
            />
            <path d="M4.91,19.78c1.4,1.26,3.03,2.12,4.9,2.48v-6.32L4.91,19.78z" />
          </g>
        </svg>
        <h1 className="text-2xl text-center text-slate-800">
          Receipt from Acme Inc.
        </h1>
        <p className="pt-2 text-center text-slate-400">Receipt #{id}</p>
        <div className="flex-grow p-12 bg-white rounded-t-none shadow-xl rounded-2xl shadow-black/10">
          <div className="flex justify-between gap-4">
            <div>
              <div className="pb-1 text-sm font-bold text-gray-400 uppercase">
                Amount paid
              </div>
              <div className="flex items-center gap-4">${total}</div>
            </div>
            <div>
              <div className="pb-1 text-sm font-bold text-gray-400 uppercase">
                Date
              </div>
              <div className="flex items-center gap-4">
                {new Date(date).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="pb-1 text-sm font-bold text-gray-400 uppercase">
                Payment method
              </div>
              <div className="flex items-center gap-4 font-mono">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1200"
                  height="800"
                  version="1.1"
                  viewBox="-96 -98.908 832 593.448"
                  className="h-4"
                >
                  <path
                    fill="#ff5f00"
                    strokeWidth="5.494"
                    d="M224.833 42.298h190.416v311.005H224.833z"
                    display="inline"
                  ></path>
                  <path
                    fill="#eb001b"
                    strokeWidth="5.494"
                    d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z"
                  ></path>
                  <path
                    fill="#f79e1b"
                    strokeWidth="5.494"
                    d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z"
                    className="e"
                  ></path>
                </svg>
                0911
              </div>
            </div>
          </div>
          <h2 className="py-6 pt-12 text-sm font-bold uppercase text-slate-600">
            Summary
          </h2>
          <div className="px-6 py-2 rounded-md bg-slate-100">
            <table className="w-full">
              <tr className="border-b text-slate-500">
                <td className="py-4">Basic Pro Plan</td>
                <td className="py-4">$12.99</td>
              </tr>
              <tr className="font-bold text-slate-700">
                <td className="py-4">Amount charged</td>
                <td className="py-4">$12.99</td>
              </tr>
            </table>
          </div>
          <hr className="my-6" />
          This is some additional content to to inform you that Acme Inc. is a
          fake company and this is a fake receipt. This is just a demo to show
          you how you can create a beautiful receipt with Onedoc.{" "}
          <Footnote>
            Some additional conditions may apply. This template comes from the
            react-print library, available at https://react.onedoclabs.com/
          </Footnote>
        </div>
      </main>
    </div>
  </Tailwind>
);

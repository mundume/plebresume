import { Tailwind, Markdown } from "@onedoc/react-print";
import React from "react";

type Props = {
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

export const TailwindResume = ({
  address,
  email,
  names,
  phone,
  profile,
  proffession,
}: Props) => (
  <Tailwind>
    <div className="font-sans text-slate-800">
      <div className="flex flex-col ">
        <div className="flex items-center justify-between w-full pb-8">
          <h1 className="text-4xl font-bold">{names.firstName}</h1>
          <h1 className="text-4xl font-bold">{names.lastName}</h1>
        </div>
        <div className="flex items-center justify-between w-full pb-8">
          <h1 className="text-4xl font-bold">{proffession}</h1>
          <h1 className="text-4xl font-bold">{address.city}</h1>
        </div>
      </div>
    </div>
  </Tailwind>
);

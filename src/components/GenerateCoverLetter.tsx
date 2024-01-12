"use client";

import React from "react";
import { Button } from "./ui/button";
import { Lightbulb } from "lucide-react";

type Props = {
  url: string;
};

const GenerateCoverLetter = ({ url }: Props) => {
  return (
    <Button
      className="mx-4"
      onClick={async () => {
        const res = await fetch(`api/coverletter`, {
          method: "POST",
          body: JSON.stringify({
            url: url,
          }),
        });
      }}
    >
      <Lightbulb className="w-4 h-4 mr-1.5 hover:shadow-2xl text-yellow-400" />
      Generate Resume
    </Button>
  );
};

export default GenerateCoverLetter;

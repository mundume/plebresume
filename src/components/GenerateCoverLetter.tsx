"use client";

import React from "react";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

type Props = {
  id: string;
};

const GenerateCoverLetter = ({ id }: Props) => {
  return (
    <Button
      className="mx-4"
      onClick={async () => {
        const res = await fetch(`/api/coverletter`, {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
        });
        const data = await res.json();
        console.log(data);
      }}
    >
      <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-yellow-400" />
      Generate Resume
    </Button>
  );
};

export default GenerateCoverLetter;

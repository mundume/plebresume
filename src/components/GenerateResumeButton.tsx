import React from "react";
import { Button } from "./ui/button";
import { Lightbulb } from "lucide-react";

type Props = {
  url: string;
};

const GenerateResumeButton = ({ url }: Props) => {
  return (
    <Button className="">
      <Lightbulb className="w-4 h-4 mr-1.5 hover:shadow-2xl text-yellow-400" />
      Generate Resume
    </Button>
  );
};

export default GenerateResumeButton;

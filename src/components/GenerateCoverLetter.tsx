"use client";

import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import { useCompletion } from "ai/react";

type Props = {
  id: string;
};

const GenerateCoverLetter = ({ id }: Props) => {
  const { complete, input, stop, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/coverletter",
    });

  const [content, setContent] = useState("");

  const checkAndPublish = useCallback(
    async (c: string) => {
      const completion = await complete(c);
      if (!completion) throw new Error("Failed to check typos");
      const typos = JSON.parse(completion);
      // you should add more validation here to make sure the response is valid
      if (typos?.length && !window.confirm("Typos found… continue?")) return;
      else alert("Post published");
    },
    [complete]
  );

  return (
    <Button className="mx-4" onClick={() => checkAndPublish(id)}>
      <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-yellow-400" />
      Generate Resume : {isLoading ? "....." : <>completion is {content}</>}
    </Button>
  );
};

export default GenerateCoverLetter;

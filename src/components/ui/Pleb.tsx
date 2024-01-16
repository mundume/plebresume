"use client";

import { useCompletion } from "ai/react";

const Pleb = () => {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/coverletter",
  });
  return <div>{isLoading ? "....." : <>completion is {completion}</>}</div>;
};

export default Pleb;

"use client";

import { Provider } from "jotai";

const CoverletterProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default CoverletterProvider;

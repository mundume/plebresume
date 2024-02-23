"use client";

import React, { createContext, use, useReducer } from "react";
type ResumeBuilderContextProps = {
  values: initialState;
  dispatch: React.Dispatch<Action>;
};
const ResumeBuilderContext = createContext<ResumeBuilderContextProps>({
  values: {
    name: "",
    email: "",
  },
  dispatch: () => {},
});

type initialState = {
  name: string;
  email: string;
};

const initialArg: initialState = {
  name: "",
  email: "",
};

type AddEmail = {
  type: "ADD_EMAIL";
  payload: {
    email: string;
  };
};
type AddName = {
  type: "ADD_NAME";
  payload: {
    name: string;
  };
};

type Action = AddEmail | AddName;

function reducer(state: initialState, action: Action) {
  switch (action.type) {
    case "ADD_EMAIL":
      return { ...state, email: action.payload.email };
    case "ADD_NAME":
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
}

export const ResumeBuilderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [values, dispatch] = useReducer(reducer, initialArg);
  return (
    <ResumeBuilderContext.Provider
      value={{
        values,
        dispatch,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
};

export const useResumeBuilderContext = () => {
  const context = use(ResumeBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useResumeBuilderContext must be used within a ResumeBuilderContextProvider"
    );
  }
  return context;
};

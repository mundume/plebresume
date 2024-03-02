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
    phone: "",
  },
  dispatch: () => {},
});

type initialState = {
  name: string;
  email: string;
  phone: string;
};

const initialArg: initialState = {
  name: "",
  email: "",
  phone: "",
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

type AddPersonalInformation = {
  type: "ADD_PERSONAL_INFORMATION";
  payload: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

type Action = AddPersonalInformation;

function reducer(state: initialState, action: Action) {
  switch (action.type) {
    case "ADD_PERSONAL_INFORMATION":
      return {
        ...state,
        ...action.payload,
      };
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

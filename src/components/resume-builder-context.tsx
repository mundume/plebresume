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
    address: {
      city: "",
      state: "",
    },
  },
  dispatch: () => {},
});

type initialState = {
  name: string;
  email: string;
  phone: string;
  address: {
    city?: string;
    state?: string;
  };
};

const initialArg: initialState = {
  name: "",
  email: "",
  phone: "",
  address: {
    city: "",
    state: "",
  },
};

type AddPersonalInformation = {
  type: "ADD_PERSONAL_INFORMATION";
  payload: {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
      city?: string;
      state?: string;
    };
  };
};

type Action = AddPersonalInformation;

function reducer(state: initialState, action: Action) {
  switch (action.type) {
    case "ADD_PERSONAL_INFORMATION":
      return {
        ...state,
        ...action.payload,
        address: {
          ...state.address,
          ...action.payload.address,
        },
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

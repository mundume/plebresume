"use client";

import React, { createContext, use, useReducer } from "react";
type ResumeBuilderContextProps = {
  values: initialState;
  dispatch: React.Dispatch<Action>;
};
const ResumeBuilderContext = createContext<ResumeBuilderContextProps>({
  values: {
    personalInfo: {
      names: {
        firstName: "",
        lastName: "",
      },
      profile: "",
      email: "",
      phone: "",
      address: {
        city: "",
        state: "",
      },
    },
    workExperience: {
      companyName: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  },
  dispatch: () => {},
});

type initialState = {
  personalInfo: {
    names: {
      firstName: string;
      lastName: string;
    };
    email: string;
    phone: string;
    profile: string;
    address: {
      city: string;
      state: string;
    };
  };
} & {
  workExperience: {
    companyName: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  };
};

const initialArg: initialState = {
  personalInfo: {
    names: {
      firstName: "",
      lastName: "",
    },
    email: "",
    phone: "",
    profile: "",
    address: {
      city: "",
      state: "",
    },
  },
  workExperience: {
    companyName: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  },
};

export type AddPersonalInformation = {
  type: "ADD_PERSONAL_INFORMATION";
  payload: {
    names?: {
      firstName?: string;
      lastName?: string;
    };
    email?: string;
    phone?: string;
    profile?: string;
    address?: {
      city?: string;
      state?: string;
    };
  };
};

export type AddWorkExperience = {
  type: "ADD_WORK_EXPERIENCE";
  payload: {
    workExperience: {
      companyName?: string;
      title?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
    };
  };
};

export type Action = AddPersonalInformation | AddWorkExperience;

function reducer(state: initialState, action: Action) {
  switch (action.type) {
    case "ADD_PERSONAL_INFORMATION":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload,
          names: {
            ...state.personalInfo.names,
            ...action.payload.names,
          },
          address: {
            ...state.personalInfo.address,
            ...action.payload.address,
          },
        },
      };
    case "ADD_WORK_EXPERIENCE":
      return {
        ...state,
        workExperience: {
          ...state.workExperience,
          ...action.payload,
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

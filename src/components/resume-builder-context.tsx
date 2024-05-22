"use client";

import React, {
  createContext,
  SetStateAction,
  use,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
export type ResumeBuilderContextProps = {
  values: initialState;
  dispatch: React.Dispatch<Action>;
  currentValues: {
    companyName: string;
    title: string;
    description: string;
    startDate: Date | string;
    endDate?: Date | undefined | string;
    currentlyWorking?: boolean | undefined;
  };
  setCurrentValues: React.Dispatch<
    SetStateAction<{
      companyName: string;
      title: string;
      description: string;
      startDate: Date | string;
      endDate?: Date | undefined | string;
      currentlyWorking?: boolean | undefined;
    }>
  >;
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
      proffession: "",
      phone: "",
      address: {
        city: "",
        state: "",
      },
    },
    workExperience: [],
  },
  dispatch: () => {},
  currentValues: {
    companyName: "",
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    currentlyWorking: false,
  },
  setCurrentValues: () => {},
});

export type initialState = {
  personalInfo: {
    names: {
      firstName: string;
      lastName: string;
    };
    email: string;
    proffession: string;
    phone: string;
    profile: string;
    address: {
      city: string;
      state: string;
    };
  };
} & {
  workExperience: WorKexperience;
};
const initialArg: initialState = {
  personalInfo: {
    names: {
      firstName: "",
      lastName: "",
    },
    email: "",
    proffession: "",
    phone: "",
    profile: "",
    address: {
      city: "",
      state: "",
    },
  },
  workExperience: [
    {
      companyName: "",
      description: "",
      endDate: "",
      startDate: "",
      title: "",
    },
  ],
};

export type AddPersonalInformation = {
  type: "ADD_PERSONAL_INFORMATION";
  payload: {
    names?: {
      firstName?: string;
      lastName?: string;
    };
    email?: string;
    proffession?: string;
    phone?: string;
    profile?: string;
    address?: {
      city?: string;
      state?: string;
    };
  };
};

export type WorkExperienceAction = {
  type: "ADD_WORK_EXPERIENCES";
  payload: WorKexperience;
};

export type WorKexperience = {
  companyName?: string;
  description?: string;
  endDate?: Date | string;
  startDate?: Date | string;
  title?: string;
}[];

export type Action = AddPersonalInformation | WorkExperienceAction;

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
    case "ADD_WORK_EXPERIENCES": {
      return {
        ...state,
        workExperience: [...state.workExperience, ...action.payload],
      };
    }

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
  const [currentValues, setCurrentValues] = useState<{
    companyName: string;
    title: string;
    description: string;
    startDate: Date | string;
    endDate?: Date | undefined | string;
    currentlyWorking?: boolean | undefined;
  }>({
    companyName: "",
    title: "",
    description: "",
    startDate: new Date(),
    endDate: undefined,
  });
  const contextValues = useMemo(
    () => ({
      values,
      dispatch,
      currentValues,
      setCurrentValues,
    }),
    [values, dispatch]
  );
  return (
    <ResumeBuilderContext.Provider
      value={{
        ...contextValues,
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

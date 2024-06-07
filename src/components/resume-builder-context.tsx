"use client";

import React, {
  createContext,
  SetStateAction,
  use,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmploymentSchema, employmentSchema } from "@/lib/schemas";
export type ResumeBuilderContextProps = {
  values: initialState;
  form: UseFormReturn<
    {
      experience: {
        companyName: string;
        title: string;
        description: string;
        startDate: Date;
        location: string;
        endDate?: Date | undefined;
        currentlyWorking?: boolean | undefined;
      }[];
    },
    any,
    undefined
  >;
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
      proffession: "",
      phone: "",
      address: {
        city: "",
        state: "",
      },
    },

    workExperience: {
      experience: [],
    },
  },
  dispatch: () => {},
  form: {} as any,
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
  workExperience: {
    experience: [],
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
  experience: {
    companyName: string;
    title: string;
    description: string;
    startDate: Date;
    endDate?: Date | undefined;
    currentlyWorking?: boolean | undefined;
  }[];
};

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
        workExperience: {
          ...state.workExperience,
          experience: [
            ...state.workExperience.experience,
            ...action.payload.experience,
          ],
        },
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

  const form = useForm<EmploymentSchema>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      experience: [
        {
          companyName: undefined,
          title: undefined,
          description: undefined,
          startDate: undefined,
          endDate: undefined,
          currentlyWorking: undefined,
          location: undefined,
        },
      ],
    },
  });

  const contextValues = useMemo(
    () => ({
      values,
      dispatch,

      form,
    }),
    [values, dispatch, form]
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

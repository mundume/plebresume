"use client";

import React, { createContext, use, useMemo, useReducer } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  educationSchema,
  EducationSchema,
  EmploymentSchema,
  employmentSchema,
} from "@/lib/schemas";
export type ResumeBuilderContextProps = {
  values: initialState;
  form: UseFormReturn<EmploymentSchema, any, undefined>;
  dispatch: React.Dispatch<Action>;
  educationForm: UseFormReturn<EducationSchema, any, undefined>;
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

    education: {
      education: [],
    },
  },
  dispatch: () => {},
  form: {} as any,
  educationForm: {} as any,
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
  workExperience: EmploymentSchema;
  education: EducationSchema;
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
    experience: [
      {
        name: "",
        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        currently: false,
        location: "",
      },
    ],
  },
  education: {
    education: [
      {
        name: "",

        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        currently: false,
        location: "",
      },
    ],
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
  payload: EmploymentSchema;
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

export type EducationAction = {
  type: "ADD_EDUCATION";
  payload: EducationSchema;
};

export type Action =
  | AddPersonalInformation
  | WorkExperienceAction
  | EducationAction;

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

    case "ADD_EDUCATION": {
      return {
        ...state,
        education: {
          ...state.education,
          education: [
            ...state.education.education,
            ...action.payload.education,
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
    defaultValues: {},
  });

  const educationForm = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {},
  });

  const contextValues = useMemo(
    () => ({
      values,
      dispatch,
      educationForm,
      form,
    }),
    [values, dispatch, form, educationForm]
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

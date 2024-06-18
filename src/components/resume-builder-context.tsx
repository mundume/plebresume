"use client";

import React, { createContext, use, useMemo, useReducer } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  educationSchema,
  EducationSchema,
  EmploymentSchema,
  employmentSchema,
  SocialLinksSchema,
} from "@/lib/schemas";
export type ResumeBuilderContextProps = {
  values: initialState;
  form: UseFormReturn<EmploymentSchema, any, undefined>;
  dispatch: React.Dispatch<Action>;
  educationForm: UseFormReturn<EducationSchema, any, undefined>;
  socialLinkForm: UseFormReturn<SocialLinksSchema, any, undefined>;
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
    socialLinks: {
      socialLinks: [],
    },
  },
  dispatch: () => {},
  form: {} as any,
  educationForm: {} as any,
  socialLinkForm: {} as any,
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
  socialLinks: SocialLinksSchema;
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
        startDate: undefined,
        endDate: undefined,
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
        startDate: undefined,
        endDate: undefined,
        currently: false,
        location: "",
      },
    ],
  },
  socialLinks: {
    socialLinks: [
      {
        name: "",
        link: "",
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
    currently?: boolean | undefined;
  }[];
};

export type EducationAction = {
  type: "ADD_EDUCATION";
  payload: EducationSchema;
};

export type SocialLinksAction = {
  type: "ADD_SOCIAL_LINKS";
  payload: SocialLinksSchema;
};
export type Action =
  | AddPersonalInformation
  | WorkExperienceAction
  | EducationAction
  | SocialLinksAction;

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

    case "ADD_SOCIAL_LINKS": {
      return {
        ...state,
        socialLinks: {
          ...state.socialLinks,
          socialLinks: [
            ...state.socialLinks.socialLinks,
            ...action.payload.socialLinks,
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
          name: "",
          title: "",
          description: "",
          startDate: undefined,
          endDate: undefined,
          currently: false,
          location: "",
        },
      ],
    },
  });
  const socialLinkForm = useForm<SocialLinksSchema>({
    defaultValues: {
      socialLinks: [{ name: "", link: "" }],
    },
  });
  const educationForm = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: [
        {
          name: "",
          title: "",
          description: "",
          startDate: undefined,
          endDate: undefined,
          currently: false,
          location: "",
        },
      ],
    },
  });

  const contextValues = useMemo(
    () => ({
      values,
      dispatch,
      educationForm,
      form,
      socialLinkForm,
    }),
    [values, dispatch, form, educationForm, socialLinkForm]
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

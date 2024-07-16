"use client";

import React, {
  createContext,
  use,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  educationSchema,
  EducationSchema,
  EmploymentSchema,
  employmentSchema,
  HobbiesFormSchema,
  LanguagesFormSchema,
  SkillsFormSchema,
  SocialLinksSchema,
} from "@/lib/schemas";
import {
  PersonalInfomationValues,
  resumeSchema,
} from "@/lib/validators/resume-validator";
import { trpc } from "@/app/_trpc/client";
export type ResumeBuilderContextProps = {
  values: initialState;
  form: UseFormReturn<EmploymentSchema, any, undefined>;
  personalInfoForm: UseFormReturn<PersonalInfomationValues, any, undefined>;
  dispatch: React.Dispatch<Action>;
  educationForm: UseFormReturn<EducationSchema, any, undefined>;
  socialLinkForm: UseFormReturn<SocialLinksSchema, any, undefined>;
  skillsForm: UseFormReturn<SkillsFormSchema, any, undefined>;
  hobbiesForm: UseFormReturn<HobbiesFormSchema>;
  languageForm: UseFormReturn<LanguagesFormSchema>;
  userId: string;
  resumeId: string;
};

const ResumeBuilderContext = createContext<ResumeBuilderContextProps>({
  values: {
    resume: {
      resume: {
        address: {
          city: "",
          state: "",
        },
        email: "",
        proffession: "",
        phone: "",
        profile: "",
        names: {
          firstName: "",
          lastName: "",
        },
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
    skillsForm: {
      skills: [],
    },
    hobbiesForm: {
      hobbies: "",
    },
    languageForm: {
      languages: [],
    },
  },
  personalInfoForm: {} as any,
  userId: "",
  resumeId: "",
  skillsForm: {} as any,
  dispatch: () => {},
  form: {} as any,
  educationForm: {} as any,
  socialLinkForm: {} as any,
  hobbiesForm: {} as any,
  languageForm: {} as any,
});

export type initialState = {
  resume: PersonalInfomationValues;
  workExperience: EmploymentSchema;
  education: EducationSchema;
  socialLinks: SocialLinksSchema;
  skillsForm: SkillsFormSchema;
  hobbiesForm: HobbiesFormSchema;
  languageForm: LanguagesFormSchema;
};
const initialArg: initialState = {
  resume: {
    resume: {
      address: {
        city: "",
        state: "",
      },
      email: "",
      proffession: "",
      phone: "",
      profile: "",
      names: {
        firstName: "",
        lastName: "",
      },
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
  skillsForm: {
    skills: [
      {
        skills: "",
        level: "",
      },
    ],
  },
  hobbiesForm: {
    hobbies: "",
  },
  languageForm: {
    languages: [
      {
        languages: "",
        level: "",
      },
    ],
  },
};

export type AddPersonalInformation = {
  type: "ADD_PERSONAL_INFORMATION";
  payload: PersonalInfomationValues;
};

export type WorkExperienceAction = {
  type: "ADD_WORK_EXPERIENCES";
  payload: EmploymentSchema;
};

export type EducationAction = {
  type: "ADD_EDUCATION";
  payload: EducationSchema;
};

export type SocialLinksAction = {
  type: "ADD_SOCIAL_LINKS";
  payload: SocialLinksSchema;
};

export type SkillsAction = {
  type: "ADD_SKILLS";
  payload: SkillsFormSchema;
};

export type AddHobbies = {
  type: "ADD_HOBBIES";
  payload: HobbiesFormSchema;
};

export type AddLanguage = {
  type: "ADD_LANGUAGE";
  payload: LanguagesFormSchema;
};
export type Action =
  | AddPersonalInformation
  | WorkExperienceAction
  | EducationAction
  | SocialLinksAction
  | SkillsAction
  | AddHobbies
  | AddLanguage;

function reducer(state: initialState, action: Action) {
  switch (action.type) {
    case "ADD_PERSONAL_INFORMATION":
      return {
        ...state,
        personalInfo: {
          ...state.resume.resume,
          ...action.payload,
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
    case "ADD_SKILLS": {
      return {
        ...state,
        skillsForm: {
          ...state.skillsForm,
          skills: [...state.skillsForm.skills, ...action.payload.skills],
        },
      };
    }

    case "ADD_HOBBIES": {
      return {
        ...state,
        hobbiesForm: {
          ...state.hobbiesForm,
          hobbies: action.payload.hobbies,
        },
      };
    }

    case "ADD_LANGUAGE": {
      return {
        ...state,
        languageForm: {
          ...state.languageForm,
          language: [
            ...state.languageForm.languages,
            ...action.payload.languages,
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
  userId,
  resumeId,
}: {
  children: React.ReactNode;
  userId: string;
  resumeId: string;
}) => {
  const [values, dispatch] = useReducer(reducer, initialArg);
  const { data: resume, isLoading } = trpc.getResume.useQuery({ id: resumeId });
  const personalInfoForm = useForm<PersonalInfomationValues>({
    defaultValues: {
      resume: {
        names: {
          firstName: isLoading ? "" : resume?.firstName || "",
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
    },
    resolver: zodResolver(resumeSchema),
  });

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

  const skillsForm = useForm<SkillsFormSchema>({
    defaultValues: {
      skills: [{ skills: "", level: "" }],
    },
  });

  const hobbiesForm = useForm<HobbiesFormSchema>({
    defaultValues: { hobbies: "" },
  });

  const languageForm = useForm<LanguagesFormSchema>({
    defaultValues: { languages: [{ languages: "", level: "" }] },
  });

  const contextValues = useMemo(
    () => ({
      values,
      dispatch,
      educationForm,
      form,
      socialLinkForm,
      skillsForm,
      hobbiesForm,
      languageForm,
      userId,
      resumeId,
      personalInfoForm,
    }),
    [
      values,
      dispatch,
      form,
      educationForm,
      socialLinkForm,
      skillsForm,
      hobbiesForm,
      languageForm,
      userId,
      resumeId,
      personalInfoForm,
    ]
  );

  useEffect(() => {
    if (!isLoading && resume) {
      personalInfoForm.reset({
        resume: {
          names: {
            firstName: resume.firstName || "",
            lastName: resume.lastName || "",
          },
          email: resume.email || "",
          proffession: resume.profession || "",
          phone: resume.phone || "",
          profile: resume.profile || "",
          address: {
            city: resume.city || "",
            state: resume.state || "",
          },
        },
      });

      form.reset({
        // @ts-ignore
        experience: resume.workExperience || [],
      });

      educationForm.reset({
        // @ts-ignore
        education: resume.education || [],
      });

      socialLinkForm.reset({
        // @ts-ignore
        socialLinks: resume.socialLinks || [],
      });
      languageForm.reset({
        // @ts-ignore
        languages: resume.languages || [],
      });
      skillsForm.reset({
        // @ts-ignore
        skills: resume.skills || [],
      });
      hobbiesForm.reset({
        // @ts-ignore
        hobbies: resume.hobbies || [],
      });
    }
  }, [
    resume,
    isLoading,
    personalInfoForm,
    form,
    educationForm,
    socialLinkForm,
    languageForm,
    skillsForm,
    hobbiesForm,
  ]);

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

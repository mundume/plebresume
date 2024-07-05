import {
  CreatedResume,
  Skill,
  SocialLink,
  Education,
  Language,
  WorkExperience,
} from "@prisma/client/edge";

export type Resume = CreatedResume & {
  skills: Skill[];
  socialLinks: SocialLink[];
  education: Education[];
  languages: Language[];
  workExperience: WorkExperience[];
};

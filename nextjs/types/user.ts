export type user = {
  username: string;
  password: string;
  id: string;
  admin: boolean;
  application: {
    essays: Essay[];
    extracurriculars: Extracurriculars[];
    honors: Honors[];
  };
  profile: Profile;
};

export type Profile = {
  graduationYear: string;
  gender: string;
  race: string;
  state: string;
  country: string;
  unweightedGPA: string;
  weightedGPA: string;
  classRank: string;
  classSize: string;
  school: {
    name: string;
    id: string; // uuid
  };
  schoolType: "public" | "private" | "charter" | "homeschool" | string;
  schoolLocation: "urban" | "suburban" | "rural" | string;
  schoolSize: "small" | "medium" | "large" | string;

  satScore: string;
  actScore: string;
  apScores: APScore[];
};

export type APScore = {
  subject: string;
  score: string;
  year: string;
};

/**
 * Includes Supplementals
 */
export type Essay = {
  id: string | number;
  name: string;
  prompt: string;
  wordCount: Number;
  year: string;
  school: null | {
    name: string;
    id: string;
  };
  content: string;
};

export type Extracurriculars = {
  name: string;
  id: string; // uuid
  type:
    | "sport"
    | "club"
    | "research"
    | "hobby"
    | "volunteering"
    | "summer program"
    | "job"
    | "intern"
    | string;
  leadershipPosition: string;
  years: number;
  hoursPerYear: number;
  impact: string;
};

export type Honors = {
  name: string;
  grade: string;
  id: string; // uuid
  recognition:
    | "international"
    | "national"
    | "state"
    | "regional"
    | "city"
    | "school"
    | string;
};

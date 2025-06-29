export type user = {
  username: String;
  password: String;
  id: String;
  admin: boolean;
  application: {
    essays: Essay[];
    extracurriculars: Extracurriculars[];
    honors: Honors[];
  };
  profile: Profile;
};

export type Profile = {
  graduationYear: String;
  gender: String;
  race: String;
  state: String;
  country: String;
  unweightedGPA: String;
  weightedGPA: String;
  classRank: String;
  classSize: String;
  school: {
    name: String;
    id: String; // uuid
  };
  schoolType: "public" | "private" | "charter" | "homeschool" | String;
  schoolLocation: "urban" | "suburban" | "rural" | String;
  schoolSize: "small" | "medium" | "large" | String;

  satScore: String;
  actScore: String;
  apScores: APScore[];
};

export type APScore = {
  subject: String;
  score: String;
  year: String;
};

/**
 * Includes Supplementals
 */
export type Essay = {
  id: String | number;
  name: String;
  prompt: String;
  wordCount: Number;
  year: String;
  school: null | {
    name: String;
    id: String;
  };
  content: String;
};

export type Extracurriculars = {
  name: String;
  id: String; // uuid
  type:
    | "sport"
    | "club"
    | "research"
    | "hobby"
    | "volunteering"
    | "summer program"
    | "job"
    | "intern"
    | String;
  leadershipPosition: String;
  years: String;
  hoursPerYear: String;
  impact: String;
};

export type Honors = {
  name: String;
  grade: String;
  id: String; // uuid
  recognition:
    | "international"
    | "national"
    | "state"
    | "regional"
    | "city"
    | "school"
    | String;
};

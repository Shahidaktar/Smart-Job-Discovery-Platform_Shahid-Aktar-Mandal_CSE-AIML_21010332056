export type User = {
  name: string;
  email: string;
  gender: string;
  photo: string;
  dob: string;
  _id: string;
  role: string;
};

export type Resume = {
  formdata: FormData;
};

export type UpdateResume = {
  singleresume: string;
  user: string;
};

export type Job = {
  name: string;
  company: string;
  pay: string;
  experience: string;
  jobType: string;
  location: string;
  openings: number;
  jobSummary: string;
  responsibities: string;
  skils: string;
  status: string;
  _id: string;
  user: User;
};

export type JobData = {
  name: string;
  company: string;
  pay: string;
  experience: string;
  jobType: string;
  location: string;
  openings: string;
  jobSummary: string;
  responsibities: string;
  skils: string;
  status: string;
};

export type Apply = {
  user: string;
  job: Job;
  resume: string;
  status?: string;
};

export type NewApplyforAll = {
  _id: string;
  user: User;
  job: string;
  score?: number;
  status?: string;
};

export type Post = {
  _id: string;
  content: string;
  image: {
    public_id: string;
    url: string;
  };
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type FavoriteJob = {
  _id: string;
  name: string;
  company: string;
  location: string;
  jobSummary: string;
};

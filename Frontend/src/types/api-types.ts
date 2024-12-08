import {
  Apply,
  Job,
  JobData,
  NewApplyforAll,
  Post,
  UpdateResume,
  User,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type MsgResponse = {
  success: boolean;
  message: string;
  r: {};
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};
export type resumeResponse = {
  success: boolean;
  resume: UpdateResume[];
};

export type AllJobsResponse = {
  success: boolean;
  data: Job[];
};

export type searchJobsResponse = {
  success: boolean;
  jobs: Job[];
  allJobs: Job[];
  totalPage: number;
};

export type JobResponse = {
  success: boolean;
  data: Job;
};

export type ResumeScoreResponse = {
  score: number;
};

export type searchJobsRequest = {
  search: string;
  location?: string;
  jobType?: string;
  experience?: string;
  status?: string;
  pay?: string;
  page: number;
};

export type NewJobRequest = {
  id: string;
  JobData: JobData;
};

export type ChangeRequest = {
  user: string;
  id: string;
  status: string;
};

export type UpdateJobRequest = {
  userId: string;
  jobId: string;
  JobData: JobData;
};

export type DeleteJobRequest = {
  userId: string;
  jobId: string;
};

export type NewApplyRequest = {
  user: string;
  data: {
    job: string;
    resume: string;
    score: number;
  };
};

export type AllApplyRequest = {
  jobId: string;
  adminId: string;
};

export type ResumeScoreRequest = {
  url: string;
  skills: string[];
};

export type ApplyResponse = {
  success: boolean;
  data: Apply[];
};

export type AllApplyResponse = {
  success: boolean;
  data: NewApplyforAll[];
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type PostResponse = {
  success: boolean;
  posts: Post[];
};

export type NewPostResponse = {
  success: boolean;
  message: string;
};

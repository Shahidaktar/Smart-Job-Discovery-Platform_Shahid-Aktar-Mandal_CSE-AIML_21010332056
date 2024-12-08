import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllJobsResponse,
  DeleteJobRequest,
  JobResponse,
  MessageResponse,
  NewJobRequest,
  UpdateJobRequest,
  searchJobsRequest,
  searchJobsResponse,
} from "../../types/api-types";

export const jobAPI = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/job/`,
  }),
  tagTypes: ["job"],
  endpoints: (builder) => ({
    allJobs: builder.query<AllJobsResponse, string>({
      query: (id) => `admin-jobs?id=${id}`,
      providesTags: ["job"],
    }),

    recruiterJobs: builder.query<AllJobsResponse, string>({
      query: (id) => `recruiter-jobs?id=${id}`,
      providesTags: ["job"],
    }),

    searchJobs: builder.query<searchJobsResponse, searchJobsRequest>({
      query: ({ search, page, jobType, location, experience, status, pay }) => {
        let base = `all?search=${search}&page=${page}`;
        if (jobType) base += `&jobType=${jobType}`;
        if (location) base += `&location=${location}`;
        if (experience) base += `&experience=${experience}`;
        if (status) base += `&status=${status}`;
        if (pay) base += `&pay=${pay}`;

        return base;
      },
      providesTags: ["job"],
    }),
    jobDetails: builder.query<JobResponse, string>({
      query: (id) => id,
      providesTags: ["job"],
    }),
    newJob: builder.mutation<MessageResponse, NewJobRequest>({
      query: ({ id, JobData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: JobData,
      }),
      invalidatesTags: ["job"],
    }),
    updateJob: builder.mutation<MessageResponse, UpdateJobRequest>({
      query: ({ userId, jobId, JobData }) => ({
        url: `${jobId}?id=${userId}`,
        method: "PUT",
        body: JobData,
      }),
      invalidatesTags: ["job"],
    }),
    deleteJob: builder.mutation<MessageResponse, DeleteJobRequest>({
      query: ({ userId, jobId }) => ({
        url: `${jobId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),
  }),
});

export const {
  useAllJobsQuery,
  useSearchJobsQuery,
  useJobDetailsQuery,
  useNewJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useRecruiterJobsQuery,
} = jobAPI;

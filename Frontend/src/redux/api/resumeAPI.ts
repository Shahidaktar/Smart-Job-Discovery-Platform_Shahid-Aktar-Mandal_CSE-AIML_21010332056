import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { MessageResponse, resumeResponse } from "../../types/api-types";
import { Resume } from "../../types/types";

export const resumeAPI = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/resume/`,
  }),
  tagTypes: ["resume"],
  endpoints: (builder) => ({
    resumeUpload: builder.mutation<MessageResponse, Resume>({
      query: ({ formdata }) => ({
        url: "new",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["resume"],
    }),
    getResumeByJob: builder.query<any, string>({
      query: (id) => `job-apply/${id}`,
      providesTags: ["resume"],
    }),
  }),
});

export const getResume = async (id: string) => {
  try {
    const { data }: { data: resumeResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/resume/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useResumeUploadMutation, useGetResumeByJobQuery } = resumeAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { ResumeScoreRequest, ResumeScoreResponse } from "../../types/api-types";

export const rankAPI = createApi({
  reducerPath: "rankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_ML_SERVER}/`,
  }),
  tagTypes: ["score"],
  endpoints: (builder) => ({
    resumeScore: builder.mutation<ResumeScoreResponse, ResumeScoreRequest>({
      query: ({ url, skills }) => ({
        url: `score`,
        method: "POST",
        body: { url, skills },
      }),
      invalidatesTags: ["score"],
    }),

    recommendjob: builder.mutation<any, any>({
      query: ({ url }) => ({
        url: `recommend-job`,
        method: "POST",
        body: url,
      }),
      invalidatesTags: ["score"],
    }),
  }),
});

export const recomend = async (url: string) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_ML_SERVER}/recommend-job`,
      { url }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useResumeScoreMutation, useRecommendjobMutation } = rankAPI;

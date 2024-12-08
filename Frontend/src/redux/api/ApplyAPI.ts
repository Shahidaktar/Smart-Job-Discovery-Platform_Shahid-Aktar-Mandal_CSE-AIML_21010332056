import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  AllApplyRequest,
  AllApplyResponse,
  ApplyResponse,
  ChangeRequest,
  MessageResponse,
  MsgResponse,
} from "../../types/api-types";

export const applyAPI = createApi({
  reducerPath: "applyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/apply/`,
  }),
  tagTypes: ["apply"],
  endpoints: (builder) => ({
    allApplies: builder.query<AllApplyResponse, AllApplyRequest>({
      query: ({ jobId, adminId }) => `all/${jobId}?id=${adminId}`,
      keepUnusedDataFor: 0,
    }),
    applyDetails: builder.query<ApplyResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["apply"],
    }),
    existingApply: builder.query<{ success: boolean; status: boolean }, any>({
      query: ({ user, job }) => `existing/${job}?user=${user}`,
      keepUnusedDataFor: 0,
    }),
    newApply: builder.mutation<MessageResponse, any>({
      query: ({ user, data }) => ({
        url: `new?user=${user}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["apply"],
    }),
    updateApply: builder.mutation<MessageResponse, any>({
      query: ({ user, data }) => ({
        url: `${data.id}?id=${user}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["apply"],
    }),
  }),
});

export const changeStatus = async ({ id, user, status }: ChangeRequest) => {
  try {
    const { data }: { data: MsgResponse } = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/apply/${id}?id=${user}`,
      { status }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const {
  useNewApplyMutation,
  useApplyDetailsQuery,
  useAllAppliesQuery,
  useExistingApplyQuery,
  useUpdateApplyMutation,
} = applyAPI;

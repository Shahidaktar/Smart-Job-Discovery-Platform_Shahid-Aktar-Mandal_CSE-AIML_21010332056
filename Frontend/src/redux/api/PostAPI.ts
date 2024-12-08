import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { NewPostResponse, PostResponse } from "../../types/api-types";

export const postAPI = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/post/`,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostResponse, void>({
      query: () => "all",
      providesTags: ["Posts"],
    }),

    newPost: builder.mutation<NewPostResponse, any>({
      query: ({ data, user }) => ({
        url: `new?user=${user}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const createPost = async ({ data, user }: any) =>
  await axios.post(
    `${import.meta.env.VITE_SERVER}/api/v1/post/new?user=${user}`,
    data
  );

export const { useGetAllPostsQuery, useNewPostMutation } = postAPI;

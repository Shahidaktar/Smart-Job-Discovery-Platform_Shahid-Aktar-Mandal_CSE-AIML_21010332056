import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteState } from "../../types/reducer-types";
import { FavoriteJob } from "../../types/types";

const initialState: FavoriteState = {
  favoriteJobs: [],
};

export const favoriteReducer = createSlice({
  name: "favoriteReducer",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteJob>) => {
      const existingJob = state.favoriteJobs.find(
        (job) => job._id === action.payload._id
      );
      if (!existingJob) {
        state.favoriteJobs.push(action.payload);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteJobs = state.favoriteJobs.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteReducer.actions;

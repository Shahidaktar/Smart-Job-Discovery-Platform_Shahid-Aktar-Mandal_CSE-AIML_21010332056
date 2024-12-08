import { FavoriteJob, User } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface ResumeReducerInitialState {
  singleresume: string | null;
  loading: boolean;
}

export interface FavoriteState {
  favoriteJobs: FavoriteJob[];
}

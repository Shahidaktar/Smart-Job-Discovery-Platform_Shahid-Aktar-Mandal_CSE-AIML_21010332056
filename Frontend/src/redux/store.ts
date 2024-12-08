import { configureStore } from "@reduxjs/toolkit";
import { applyAPI } from "./api/ApplyAPI";
import { jobAPI } from "./api/jobAPI";
import { postAPI } from "./api/PostAPI";
import { rankAPI } from "./api/RankAPI";
import { resumeAPI } from "./api/resumeAPI";
import { userAPI } from "./api/userAPI";
import { favoriteReducer } from "./reducer/favoriteReducer";
import { resumeReducer } from "./reducer/resumeReducer";
import { userReducer } from "./reducer/userReducer";

export const server = import.meta.env.VITE_SERVER;
export const server_ml = import.meta.env.VITE_ML_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [resumeAPI.reducerPath]: resumeAPI.reducer,
    [jobAPI.reducerPath]: jobAPI.reducer,
    [applyAPI.reducerPath]: applyAPI.reducer,
    [rankAPI.reducerPath]: rankAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [resumeReducer.name]: resumeReducer.reducer,
    [favoriteReducer.name]: favoriteReducer.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      userAPI.middleware,
      resumeAPI.middleware,
      jobAPI.middleware,
      applyAPI.middleware,
      rankAPI.middleware,
      postAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

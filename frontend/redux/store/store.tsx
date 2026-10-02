import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "../reducer/auth.slice";
import employReducer from "../reducer/employ.slice";
import projectListReducer from "../reducer/project.slice";
import roleReducer from "../reducer/roles.silce";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employs: employReducer,
    projects: projectListReducer,
    roles: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

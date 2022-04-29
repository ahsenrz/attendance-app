import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import parentReducer from "./parentReducer";

const store = configureStore({
  reducer: parentReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof parentReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export default store;
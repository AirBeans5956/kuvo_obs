import { Store, combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// --- app reducers ---
import obsSlice, { initialState as obsState } from "./obs/slice";
import kuvoSlice, { initialState as kuvoState } from './kuvo/slice';
// --- app reducers end ---

const reducer = combineReducers({
  obs: obsSlice.reducer,
  kuvo: kuvoSlice.reducer,
});

const preloadState = () => {
  return {
    obs: obsState,
    kuvo: kuvoState,
  };
};

export type StoreState = ReturnType<typeof preloadState>;
export type ReduxStore = Store<Store>;

const createStore = () => {
  return configureStore({
    reducer: reducer,
    preloadedState: preloadState(),
    devTools: false,
  });
};

export default createStore;

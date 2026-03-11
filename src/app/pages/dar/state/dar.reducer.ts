import { createReducer, on } from "@ngrx/store";
import { initialState } from "./dar.state";
import {
  fetchDarFailedAction,
  fetchDarStartAction,
  fetchDarSuccessAction,
} from "./dar.actions";

export const darReducer = createReducer(
  initialState,
  on(fetchDarStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(fetchDarSuccessAction, (state, action) => {
    return {
      ...state,
      dars: action.dar,
      loading: false,
      error: null,
    };
  }),
  on(fetchDarFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);

import { createReducer, on } from "@ngrx/store";
import { initialState } from "./my-report.state";
import {
  fetchMyReportFaieldAction,
  fetchMyReportStartAction,
  fetchMyReportSuccessAction,
} from "./my-report.actions";

export const myReportReducer = createReducer(
  initialState,
  on(fetchMyReportStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(fetchMyReportSuccessAction, (state, action) => {
    return {
      ...state,
      reports: action.reports,
      loading: false,
      error: null,
    };
  }),
  on(fetchMyReportFaieldAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);

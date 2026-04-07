import { createReducer, on } from "@ngrx/store";
import { initialState } from "./detail-report.state";
import {
  getDetailReportFailureAction,
  getDetailReportStartAction,
  getDetailReportSuccessAction,
} from "./detail-report.actions";

export const detailReportReducer = createReducer(
  initialState,
  on(getDetailReportStartAction, (state, action) => ({
    ...state,
    loading: true,
  })),

  on(getDetailReportSuccessAction, (state, action) => ({
    ...state,
    loading: false,
    detailReport: action.detailReports,
  })),

  on(getDetailReportFailureAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);

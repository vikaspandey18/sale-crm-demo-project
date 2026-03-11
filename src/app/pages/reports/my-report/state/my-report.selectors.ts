import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MyReportState } from "./my-report.state";

const getMyReportFeatureSelector =
  createFeatureSelector<MyReportState>("myReport");

export const getMyReportSelector = createSelector(
  getMyReportFeatureSelector,
  (state) => {
    return state?.reports;
  },
);

export const getMyReportLoadingSelector = createSelector(
  getMyReportFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getMyReportErrorSelector = createSelector(
  getMyReportFeatureSelector,
  (state) => {
    return state.error;
  },
);

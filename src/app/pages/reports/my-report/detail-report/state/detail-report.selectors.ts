import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DetailReportState } from "./detail-report.state";

const selectDetailReport =
  createFeatureSelector<DetailReportState>("detailReport");

export const selectDetailReportData = createSelector(
  selectDetailReport,
  (state) => state.detailReport,
);
export const selectDetailReportLoading = createSelector(
  selectDetailReport,
  (state) => state.loading,
);

export const selectDetailReportError = createSelector(
  selectDetailReport,
  (state) => state.error,
);

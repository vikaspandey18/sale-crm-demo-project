import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttendanceReportState } from "./attedance-report.state";

const attendanceReportSelect =
  createFeatureSelector<AttendanceReportState>("attendaceReport");

export const selectLoadingAttendaceReport = createSelector(
  attendanceReportSelect,
  (state) => {
    return state.loading;
  },
);

export const selectErrorAttendaceReport = createSelector(
  attendanceReportSelect,
  (state) => {
    return state.error;
  },
);

export const selectAttendaceReport = createSelector(
  attendanceReportSelect,
  (state) => {
    return state.attendanceReport;
  },
);

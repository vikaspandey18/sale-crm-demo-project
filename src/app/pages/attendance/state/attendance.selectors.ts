import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttendanceState } from "./attendance.state";

const getMarkAttendanceFeatureSelector =
  createFeatureSelector<AttendanceState>("markAttendance");

export const getMarkAttendanceCheckIn = createSelector(
  getMarkAttendanceFeatureSelector,
  (state) => {
    return state.record?.checkin_time;
  },
);

export const getMarkAttendanceCheckOut = createSelector(
  getMarkAttendanceFeatureSelector,
  (state) => {
    return state.record?.checkout_time;
  },
);

export const getMarkAttendanceLoading = createSelector(
  getMarkAttendanceFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getMarkAttendanceError = createSelector(
  getMarkAttendanceFeatureSelector,
  (state) => {
    return state.error;
  },
);

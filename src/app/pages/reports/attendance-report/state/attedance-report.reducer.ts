import { createReducer, on } from "@ngrx/store";
import { initialState } from "./attedance-report.state";
import {
  loadAttendanceReportFailedAction,
  loadAttendanceReportStartAction,
  loadAttendanceReportSuccessAction,
} from "./attedance-report.actions";

export const attendanceReportReducer = createReducer(
  initialState,
  on(loadAttendanceReportStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadAttendanceReportSuccessAction, (state, action) => {
    return {
      ...state,
      loading: false,
      attendanceReport: action.attendanceReport,
    };
  }),
  on(loadAttendanceReportFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      attendanceReport: [],
    };
  }),
);

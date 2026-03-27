import { createAction, props } from "@ngrx/store";
import { AttendanceReportResponse } from "../../../../models/attendance-report.model";

export const loadAttendanceReportStartAction = createAction(
  "[attendance report] fetch start",
  props<{ fromDate: string; toDate: string }>(),
);

export const loadAttendanceReportSuccessAction = createAction(
  "[attendance report] fetch success",
  props<{ attendanceReport: AttendanceReportResponse[] }>(),
);

export const loadAttendanceReportFailedAction = createAction(
  "[attendace report] fetch failed",
  props<{ error: string }>(),
);

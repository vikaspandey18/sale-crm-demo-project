import { createAction, props } from "@ngrx/store";
import { MarkAttendanceResponse } from "../../../models/mark-attendance.model";

export const markAttendaceStartAction = createAction("[mark attendance] start");

export const markCheckInAction = createAction(
  "[mark] attendance checkIn start",
  props<{ checkIn: string }>(),
);

export const markAttendaceSuccessAction = createAction(
  "[mark attendance] success",
  props<{ record: MarkAttendanceResponse }>(),
);
export const markAttendaceFailedAction = createAction(
  "[mark attendance] failed",
  props<{ error: string }>(),
);

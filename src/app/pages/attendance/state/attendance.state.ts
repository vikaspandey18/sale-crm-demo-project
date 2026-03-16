import { MarkAttendanceResponse } from "../../../models/mark-attendance.model";

export interface AttendanceState {
  record: MarkAttendanceResponse | null;
  loading: boolean;
  error: string | null;
  checkedIn: boolean;
}

export const initialState: AttendanceState = {
  record: null,
  loading: false,
  error: null,
  checkedIn: false,
};

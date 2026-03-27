import { AttendanceReportResponse } from "../../../../models/attendance-report.model";

export interface AttendanceReportState {
  attendanceReport: AttendanceReportResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: AttendanceReportState = {
  attendanceReport: [],
  loading: false,
  error: null,
};

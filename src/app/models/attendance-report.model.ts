export interface AttendanceReportResponse {
  date: string;
  checkIn?: string;
  checkOut?: string;
  isPresent: boolean;
  totalHours: number;
}

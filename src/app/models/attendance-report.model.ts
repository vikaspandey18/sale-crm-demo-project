export interface AttendanceReportResponse {
  date: string;
  checkIn?: string;
  checkOut?: string;
  isPresent: "Present" | "Absent" | "Holiday" | "Leave";
  totalHours: number;
}

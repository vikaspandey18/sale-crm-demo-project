import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";
import { AttendanceReportResponse } from "../../../../models/attendance-report.model";

@Injectable({
  providedIn: "root",
})
export class AttendanceReportService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getAttendaceReport(
    fromDate: string,
    toDate: string,
  ): Observable<ApiResponse<AttendanceReportResponse[]>> {
    const url = `${this.baseUrl}/attendance/attendanceReport.php`;
    const body = {
      fromDate,
      toDate,
    };
    return this.http.post<ApiResponse<AttendanceReportResponse[]>>(url, body);
  }
}

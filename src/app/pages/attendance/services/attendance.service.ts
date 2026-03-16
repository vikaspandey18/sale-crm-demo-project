import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { MarkAttendanceResponse } from "../../../models/mark-attendance.model";

@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  private http: HttpClient = inject(HttpClient);

  markCheckIn(
    checkInTime: string,
  ): Observable<ApiResponse<MarkAttendanceResponse>> {
    const url =
      "https://rushabh.vizitlog.com/newapi/attendance/mark-attendance.php";
    const body = {
      checkInTime,
    };

    return this.http.post<ApiResponse<MarkAttendanceResponse>>(url, body);
  }

  markCheckOut(
    checkOutTime: string,
  ): Observable<ApiResponse<MarkAttendanceResponse>> {
    const url =
      "https://rushabh.vizitlog.com/newapi/attendance/mark-attendance.php";
    const body = {
      checkOutTime,
    };

    return this.http.post<ApiResponse<MarkAttendanceResponse>>(url, body);
  }
}

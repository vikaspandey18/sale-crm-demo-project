import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";
import { MyReportResponse } from "../../../../models/my-report.model";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private http: HttpClient = inject(HttpClient);

  getMyReport(): Observable<ApiResponse<MyReportResponse[]>> {
    const url = "https://rushabh.vizitlog.com/newapi/report/myReport.php";
    return this.http.get<ApiResponse<MyReportResponse[]>>(url);
  }
}

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";
import { CollectionReportResponse } from "../../../../models/collection-report.model";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CollectionReportService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getCollectionReport(
    fromDate: string,
    toDate: string,
  ): Observable<ApiResponse<CollectionReportResponse[]>> {
    const url = `${this.baseUrl}/collection/getCollection.php`;
    const body = { fromDate, toDate };
    return this.http.post<ApiResponse<CollectionReportResponse[]>>(url, body);
  }
}

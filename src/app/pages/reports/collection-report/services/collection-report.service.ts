import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";
import { CollectionReportResponse } from "../../../../models/collection-report.model";

@Injectable({
  providedIn: "root",
})
export class CollectionReportService {
  private http: HttpClient = inject(HttpClient);

  getCollectionReport(): Observable<ApiResponse<CollectionReportResponse[]>> {
    const url =
      "https://rushabh.vizitlog.com/newapi/collection/getCollection.php";
    return this.http.get<ApiResponse<CollectionReportResponse[]>>(url);
  }
}

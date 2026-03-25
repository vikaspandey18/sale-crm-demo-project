import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";
import { OrderReportResponse } from "../../../../models/order-report.model";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrderReportService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  getOrderReport(
    fromDate: string,
    toDate: string,
  ): Observable<ApiResponse<OrderReportResponse[]>> {
    const url = `${this.baseUrl}/order/getOrder.php`;
    const body = {
      fromDate,
      toDate,
    };
    return this.http.post<ApiResponse<OrderReportResponse[]>>(url, body);
  }
}

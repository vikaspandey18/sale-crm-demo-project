import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";
import { OrderReportResponse } from "../../../../models/order-report.model";

@Injectable({
  providedIn: "root",
})
export class OrderReportService {
  private http: HttpClient = inject(HttpClient);

  getOrderReport(): Observable<ApiResponse<OrderReportResponse[]>> {
    const url = "https://rushabh.vizitlog.com/newapi/order/getOrder.php";
    return this.http.get<ApiResponse<OrderReportResponse[]>>(url);
  }
}

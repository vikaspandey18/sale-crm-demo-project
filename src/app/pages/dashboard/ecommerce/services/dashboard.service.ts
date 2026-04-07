import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";

export interface DashboardResponse {
  totalCustomer: number;
  totalOrder: number;
  totalPayment: number;
}

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private http = inject(HttpClient);

  getTotalCustomer(): Observable<ApiResponse<DashboardResponse>> {
    const url = `${environment.apiUrl}/dashboard/getTotalCustomer.php`;
    return this.http.get<ApiResponse<DashboardResponse>>(url);
  }

  getTotalOrder(): Observable<ApiResponse<DashboardResponse>> {
    const url = `${environment.apiUrl}/dashboard/getTotalOrder.php`;
    return this.http.get<ApiResponse<DashboardResponse>>(url);
  }

  getTotalCollection(): Observable<ApiResponse<DashboardResponse>> {
    const url = `${environment.apiUrl}/dashboard/getTotalCollection.php`;
    return this.http.get<ApiResponse<DashboardResponse>>(url);
  }
}

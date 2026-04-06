import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { IndiaMartCustomer } from "../../../models/india-mart.model";
import { environment } from "../../../../environments/environment";
import { DarResponse } from "../../../models/dar.model";

@Injectable({
  providedIn: "root",
})
export class IndiamartService {
  private http: HttpClient = inject(HttpClient);

  getIndianMartCustomer(): Observable<ApiResponse<IndiaMartCustomer[]>> {
    const url = `${environment.apiUrl}/customer/indiaMartCustomer.php`;
    return this.http.get<ApiResponse<IndiaMartCustomer[]>>(url);
  }

  updateCustomer(
    id: string,
    field: string,
    value: any,
  ): Observable<ApiResponse<IndiaMartCustomer>> {
    const url = `${environment.apiUrl}/customer/updateIndiaMartCustomer.php/${id}`;
    const body = {
      field,
      value,
    };
    return this.http.put<ApiResponse<IndiaMartCustomer>>(url, body);
  }


  fetchCustomerHistory(id: string): Observable<ApiResponse<DarResponse[]>> {
      const url = `${environment.apiUrl}/dar/customerDarDetail.php`;
      const body = { customerId: id };
      return this.http.post<ApiResponse<DarResponse[]>>(url, body);
    }
}

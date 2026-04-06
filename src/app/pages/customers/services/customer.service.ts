import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponse } from "../../../models/customer.model";
import { ApiResponse } from "../../../models/api-response.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private http: HttpClient = inject(HttpClient);

  getCustomer(): Observable<ApiResponse<CustomerResponse[]>> {
    const url = `${environment.apiUrl}/customer/getCustomer.php?type=all`;
    return this.http.get<ApiResponse<CustomerResponse[]>>(url);
  }

  getDeleteCustomer(): Observable<ApiResponse<CustomerResponse[]>> {
    const url = `${environment.apiUrl}/customer/getCustomer.php?type=junk`;
    return this.http.get<ApiResponse<CustomerResponse[]>>(url);
  }

  
}

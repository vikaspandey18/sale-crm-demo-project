import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { AddCustomerModel } from "../../../../models/add-customer.model";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../../models/api-response.model";

@Injectable({
  providedIn: "root",
})
export class AddCustomerService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  addCustomer(data: AddCustomerModel): Observable<ApiResponse<null>> {
    const url = `${this.baseUrl}/customer/addCustomer.php`;
    return this.http.post<ApiResponse<null>>(url, data);
  }
}

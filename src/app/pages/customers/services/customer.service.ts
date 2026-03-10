import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponse } from "../../../models/customer.model";
import { ApiResponse } from "../../../models/api-response.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private http: HttpClient = inject(HttpClient);

  getCustomer(): Observable<ApiResponse<CustomerResponse[]>> {
    const url = "https://rushabh.vizitlog.com/newapi/customer/getCustomer.php";
    return this.http.get<ApiResponse<CustomerResponse[]>>(url);
  }
}

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponse } from "../../../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private http: HttpClient = inject(HttpClient);

  getCustomer(): Observable<CustomerResponse[]> {
    const url = "https://rushabh.vizitlog.com/newapi/customers.php";
    return this.http.get<CustomerResponse[]>(url);
  }
}

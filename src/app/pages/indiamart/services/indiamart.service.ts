import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { IndiaMartCustomer } from "../../../models/india-mart.model";

@Injectable({
  providedIn: "root",
})
export class IndiamartService {
  private http: HttpClient = inject(HttpClient);

  getIndianMartCustomer(): Observable<ApiResponse<IndiaMartCustomer[]>> {
    const url =
      "https://rushabh.vizitlog.com/newapi/customer/indiaMartCustomer.php";
    return this.http.get<ApiResponse<IndiaMartCustomer[]>>(url);
  }
}

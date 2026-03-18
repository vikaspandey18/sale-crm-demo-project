import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { TelecallerModel } from "../../../models/telecaller.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TelecallerService {
  private http: HttpClient = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getTelecaller(): Observable<ApiResponse<TelecallerModel[]>> {
    const url =
      "https://rushabh.vizitlog.com/newapi/customer/getTelecallerCustomer.php";
    return this.http.get<ApiResponse<TelecallerModel[]>>(url);
  }

  updateCustomer(
    customer: TelecallerModel,
  ): Observable<ApiResponse<TelecallerModel>> {
    const url = `${this.apiUrl}/${customer.id}`;
    return this.http.put<ApiResponse<TelecallerModel>>(url, customer);
  }
}

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { TelecallerModel } from "../../../models/telecaller.model";
import { environment } from "../../../../environments/environment";
import { TeleRequest } from "../../../models/tele-update.model";

interface PlainApiRespone {
  status: string;
  message: string;
}

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
    id: string,
    field: string,
    value: any,
  ): Observable<ApiResponse<TelecallerModel>> {
    const url = `${this.apiUrl}/customer/updateTelecallerCustomer.php/${id}`;
    const body = {
      field,
      value,
    };
    return this.http.put<ApiResponse<TelecallerModel>>(url, body);
  }

  addRecord(teleData: TeleRequest): Observable<PlainApiRespone> {
    const url = `${this.apiUrl}/customer/addTeleRecord.php`;
    return this.http.post<PlainApiRespone>(url, teleData);
  }
}

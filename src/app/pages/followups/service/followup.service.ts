import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { FollowUpResponse } from "../../../models/followup.model";
import { TeleRequest } from "../../../models/tele-update.model";

interface PlainApiRespone {
  status: string;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class FollowupService {
  private http = inject(HttpClient);

  baseUrl = environment.apiUrl;

  getFollowUpCustomer(): Observable<ApiResponse<FollowUpResponse[]>> {
    const url = `${this.baseUrl}/customer/getFollowUpCustomer.php`;
    return this.http.get<ApiResponse<FollowUpResponse[]>>(url);
  }

  updateCustomer(
    id: string,
    field: string,
    value: any,
    journeryId: string,
  ): Observable<ApiResponse<FollowUpResponse>> {
    const url = `${this.baseUrl}/customer/updateFollowUpCustomer.php/${id}`;
    const body = {
      field,
      value,
      journeryId,
    };
    return this.http.put<ApiResponse<FollowUpResponse>>(url, body);
  }

  addRecord(teleData: TeleRequest): Observable<PlainApiRespone> {
    const url = `${this.baseUrl}/customer/addFollowup.php`;
    return this.http.post<PlainApiRespone>(url, teleData);
  }
}

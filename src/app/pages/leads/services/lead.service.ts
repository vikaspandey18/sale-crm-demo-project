import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { LeadHistory, LeadResponse } from "../../../models/lead.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class LeadService {
  private http: HttpClient = inject(HttpClient);

  getLead(): Observable<ApiResponse<LeadResponse[]>> {
    const url = `${environment.apiUrl}/lead/getLead.php`;
    return this.http.get<ApiResponse<LeadResponse[]>>(url);
  }

  addStatus(data: any): Observable<ApiResponse<null>> {
    const url = `${environment.apiUrl}/lead/addStatus.php`;
    return this.http.post<ApiResponse<null>>(url, data);
  }

  addFollowup(data: any): Observable<ApiResponse<null>> {
    const url = `${environment.apiUrl}/lead/addFollowup.php`;
    return this.http.post<ApiResponse<null>>(url, data);
  }

  getLeadHistory(lead_id: string): Observable<ApiResponse<LeadHistory[]>> {
    const url = `${environment.apiUrl}/lead/getLeadHistory.php?lead_id=${lead_id}`;
    return this.http.get<ApiResponse<LeadHistory[]>>(url);
  }
}

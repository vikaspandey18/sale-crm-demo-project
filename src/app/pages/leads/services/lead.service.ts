import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { LeadResponse } from "../../../models/lead.model";

@Injectable({
  providedIn: "root",
})
export class LeadService {
  private http: HttpClient = inject(HttpClient);

  getLead(): Observable<ApiResponse<LeadResponse[]>> {
    const url = "https://rushabh.vizitlog.com/newapi/lead/getLead.php";
    return this.http.get<ApiResponse<LeadResponse[]>>(url);
  }
}

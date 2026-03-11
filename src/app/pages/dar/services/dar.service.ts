import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { DarResponse } from "../../../models/dar.model";

@Injectable({
  providedIn: "root",
})
export class DarService {
  private http: HttpClient = inject(HttpClient);

  getDar(): Observable<ApiResponse<DarResponse[]>> {
    const url = "https://rushabh.vizitlog.com/newapi/dar/getDar.php";
    return this.http.get<ApiResponse<DarResponse[]>>(url);
  }
}

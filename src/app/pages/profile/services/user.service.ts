import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../models/api-response.model";
import { UserRespone } from "../../../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getUser(): Observable<ApiResponse<UserRespone>> {
    const url = `${this.apiUrl}/user/getUser.php`;
    return this.http.get<ApiResponse<UserRespone>>(url);
  }
}

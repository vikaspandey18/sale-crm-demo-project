import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponse } from "../../../../models/auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginAuthService(mobile: string, password: string): Observable<AuthResponse> {
    const url = "https://rushabh.vizitlog.com/newapi/login.php";
    const body = { mobile, password };
    return this.http.post<AuthResponse>(url, body);
  }
}

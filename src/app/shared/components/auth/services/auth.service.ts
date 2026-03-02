import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponse } from "../../../../models/auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginAuthService(email: string, password: string): Observable<AuthResponse> {
    const url = "https://rushabh.vizitlog.com/newapi/login.php";
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body);
  }
}

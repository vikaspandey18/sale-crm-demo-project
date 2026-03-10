import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponse } from "../../../../models/auth.model";
import { ApiResponse } from "../../../../models/api-response.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginAuthService(
    mobile: string,
    password: string,
  ): Observable<ApiResponse<AuthResponse>> {
    const url = "https://rushabh.vizitlog.com/newapi/login.php";
    const body = { mobile, password };
    return this.http.post<ApiResponse<AuthResponse>>(url, body);
  }

  saveAuthInfoInLocalStorage(auth: AuthResponse) {
    try {
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch (e) {
      console.log("There was error in saving data to localstorage");
    }
  }

  getUserDataFromLocalStorage() {
    try {
      const loggedUser = localStorage.getItem("auth");

      if (!loggedUser) {
        return null;
      }

      const user = JSON.parse(loggedUser);

      return user;
    } catch (error) {
      console.log("Error While fetching data form localstorage");
      localStorage.removeItem("auth");

      return null;
    }
  }
}

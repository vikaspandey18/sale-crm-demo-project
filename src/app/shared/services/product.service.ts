import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../models/api-response.model";
import { ProductResponse } from "../../models/products.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProduct(): Observable<ApiResponse<ProductResponse[]>> {
    const url = `${this.apiUrl}/product/getProducts.php`;
    return this.http.get<ApiResponse<ProductResponse[]>>(url);
  }
}

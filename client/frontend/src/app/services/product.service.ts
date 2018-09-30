import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getCategories() {
    return this.http.get('productCategories');
  }

  getProducts(query?: any): Promise<any> {
    return this.http.get('product', {params: query}).toPromise();
  }

  getProduct(id: number): Promise<any> {
    return this.http.get(`product/${id}`).toPromise();
  }


}


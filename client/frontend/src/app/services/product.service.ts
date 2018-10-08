import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Promise<any> {
    return this.http.get('productCategories').toPromise();
  }

  getProducts(query?: any): Promise<any> {
    return this.http.get('products', {params: query}).toPromise();
  }

  getProduct(id: number): Promise<any> {
    return this.http.get(`product/${id}`).toPromise();
  }

  addComment(id: number, body: any): Promise<any> {
    return this.http.post(`product/${id}/addComment`, body).toPromise();
  }


}


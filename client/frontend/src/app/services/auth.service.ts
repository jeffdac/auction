import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuthenticated() {
    return !localStorage.getItem('token');
  }

  // async login(body: any) {
  //   try {
  //     let res = this.http.post('login', body);
  //   } catch (err) {
  //
  //   }
  // }
  //
  // async logout() {
  //
  // }

}

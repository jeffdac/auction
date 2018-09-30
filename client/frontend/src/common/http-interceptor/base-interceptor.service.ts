import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, retry} from "rxjs/internal/operators";
import {Observable, throwError} from "rxjs/index";
import {AuthService} from "../../app/services/auth.service";

const baseUrl = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class BaseInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = (req.url.startsWith('https://') && req.url.startsWith('http://')) ? `${req.url}` : `${baseUrl}${req.url}`;
    let update = {
      url,
      setHeaders: {'Content-Type': 'Application/json'}
    };
    if (this.auth.isAuthenticated()) {
      Object.assign(update, {setHeaders: {'Authorization': `JWT ${localStorage.getItem('token')}`}});
    }
    let newReq = req.clone(update);

    return next.handle(newReq).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }


}


// import {Injectable} from '@angular/core';
// import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
// import {Observable} from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class MyInterceptorService implements HttpInterceptor {
//
//   constructor(private httpInterceptor: HttpInterceptor) {
//   }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req.headers.set('Authorization', localStorage.getItem('token')).set('Content-Type', 'Application/json');
//
//     return null;
//   }
//
//   handleError(error) {
//
//   }
//
//
// }

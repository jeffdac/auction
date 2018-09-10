// import {Injectable, Injector} from '@angular/core';
// import {
//   HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
//   HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpClient,
// } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import {of} from 'rxjs/observable/of';
// import {catchError} from 'rxjs/operators';
// import {mergeMap} from 'rxjs/operators';
// import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
// import * as _ from 'lodash';
//
// import {EnvironmentConfig} from "../config/config";
// import {Auth} from "../../app/auth/auth.service";
// import {NativeService} from "../../providers/native.service";
//
//
// class Pagination {
//   count: number;
//   currentPage: number;
//   nextPage: number;
//   prevPage: number;
// }
//
// export class Meta {
//   pagination = new Pagination();
// }
//
//
// export interface IResponse {
//   status: boolean;
//   result: any;
//   meta?: Meta
// }
//
//
// /**
//  * 默认HTTP拦截器，其注册细节见 `app.module.ts`
//  */
// @Injectable()
// export class DefaultInterceptor implements HttpInterceptor {
//   constructor(
//     private config: EnvironmentConfig,
//     private nativeService: NativeService,
//     private injector: Injector
//   ) {
//   }
//
//
//   intercept(req: HttpRequest<any>, next: HttpHandler):
//   Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
//
//
//     // 统一加上服务端前缀
//     let url = req.url;
//     if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('./assets/i18n/') && !url.endsWith('/assets/errors/err.json')) {
//       url = this.config.apiEndPoint + url;
//     }
//
//     const update = {
//       url
//     };
//
//     const auth = this.injector.get(Auth);
//
//     // 添加token
//     if (auth.isAuthenticated()) _.assign(update, {setHeaders: {Authorization: 'JWT ' + localStorage.getItem('access_token')}});
//     if (auth.isAuthenticated() && !_.isNil(localStorage.getItem('team')) && req.method === 'GET') _.assign(update, {setParams: {teamId: localStorage.getItem('team')}});
//
//
//     const newReq = req.clone(update);
//
//
//     return next.handle(newReq).pipe(
//       mergeMap((event: any) => {
//         // 若一切都正常，则后续操作
//         return of(event);
//       }),
//       catchError((res: HttpErrorResponse) => {
//
//         if (res.error.code === 11000) {
//           // 如果是token错误，给相应的繁体或者英文提示,并重新登录
//           auth.relogin();
//           // 不弹出定时获取通知路由产生的错误
//         }else if(!url.includes('user/notifications/self/') && typeof(res.error.message) == 'string'){
//           this.nativeService.showToast(res.error.message);
//         }
//         // this.handleError(res.error);
//         // 返回错误
//         return ErrorObservable.create(res);
//       })
//     );
//
//
//   }
//   // 处理错误
//   handleError(error: any) {
//     const language = localStorage.getItem('language');
//
//
//     const http = this.injector.get(HttpClient);
//     // if (language === 'en') {
//     //   this.presentToast(error.message || 'Not Find !');
//     // } else {
//     http
//       .get(`./assets/errors/err.json`)
//       .map(res => {
//         if(language == 'en-us'){
//           this.nativeService.showToast(error.message);
//         }else{
//           const err = _.find(res, (val: any) => val.code === error.code);
//           const message: string = err ? err.message : error.message;
//           this.nativeService.showToast(message)
//         }
//
//
//       })
//       .subscribe()
//     // }
//
//   }
// }

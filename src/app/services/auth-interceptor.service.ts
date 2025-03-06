// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// // import { token } from '../pages/user-signup/user-signup.component';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService implements HttpInterceptor {

//   constructor() { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // token
//     const token = localStorage.getItem("token");

//     if (token) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(authReq);
//     }

//     // If no token is found, proceed without modifying the request
//     return next.handle(req);
//   }

// }

//THIS IS INTERCEPTOR AS A FUNCTION, WRITTEN AS IN MAIN.TS'S PROVIDER METHOD, IT TAKE FUNCTION AS ARGUMENT
import { HttpInterceptorFn } from '@angular/common/http';
import { UserSignupService } from './user-signup.service';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = localStorage.getItem("token");
  const userSignupService=inject(UserSignupService);
  const token = userSignupService.getToken();
  if (token) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(clonedReq);
  }
  return next(req);
};

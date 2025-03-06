import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserSignupService } from '../services/user-signup.service';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const userSignupService=inject(UserSignupService);
  const token = userSignupService.getToken();
  console.log(userSignupService.getToken());
  const authReq = req.clone({
    // headers: req.headers.set('Authorizatin', token),
    headers: req.headers.set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json') // Add this line
 
  });
  return next(authReq);
};

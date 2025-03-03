import { CanActivateFn, Router } from '@angular/router';
import { userDetails } from '../models/userDetails.model';
import { inject } from '@angular/core';

export const ismanagerGuard: CanActivateFn = (route, state) => {
  const userDetailsObj:userDetails=new userDetails();
  const router=inject(Router);
 if(userDetailsObj.token!=""){
  if(userDetailsObj.role=="manager"){
    return true;
  }
  else{
    alert("Not accessible")
    return false;
  }
 }
 else{
  alert("login to access this page");
  router.navigate(['/login'])
  return false
 }
};

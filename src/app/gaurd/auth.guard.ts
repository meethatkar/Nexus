import { CanActivateFn, Router } from '@angular/router';
import { userDetails } from '../models/userDetails.model';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userDetailsObj:userDetails=new userDetails();
  const router=inject(Router);
  if(localStorage.getItem("token")!=""){
    return true;
  }
  else{
    alert("please login to access this page");
    router.navigate(['/login'])
    return false;
  }
};

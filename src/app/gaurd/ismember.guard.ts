import { CanActivateFn, Router } from '@angular/router';
import { userDetails } from '../models/userDetails.model';
import { inject } from '@angular/core';

export const ismemberGuard: CanActivateFn = (route, state) => {
  const userDetailsObj:userDetails=new userDetails();
    const router=inject(Router);
  if(localStorage.getItem("token")!=""){
    if(userDetailsObj.role=="member"){
      return true;
    }
    else{
      alert("Not accessible")
      return false;
    }
   }
   else{
    alert("login to access this page")
    router.navigate(['/login'])
    return false
   }
};

// import { CanActivateFn, Router } from '@angular/router';
// import { userDetails } from '../models/userDetails.model';
// import { inject } from '@angular/core';
// import { UserDetailService } from '../services/getUser/user-detail.service';
// import { UserSignupService } from '../services/signup/user-signup.service';

// export const ismemberGuard: CanActivateFn = (route, state) => {
//   // const userDetailsObj:userDetails=new userDetails();
//     const router=inject(Router);
//     const userDetailServiceObj = inject(UserDetailService);
//     const UserSignupServiceObj = inject(UserSignupService)
//     const role=userDetailServiceObj.getUserRole();
//     const token = UserSignupServiceObj.getToken();
//   if(token!=""){
//     if(role=="member"){
//       return true;
//     }
//     else{
//       alert("Not accessible")
//       router.navigate(['/home'])
//       return false;
//     }
//    }
//    else{
//     alert("login to access this page")
//     router.navigate(['/login'])
//     return false
//    }
// };

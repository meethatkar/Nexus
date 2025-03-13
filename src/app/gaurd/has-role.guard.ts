// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { UserDetailService } from '../services/getUser/user-detail.service';
// import { UserSignupService } from '../services/signup/user-signup.service';

// export const hasRoleGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const userDetailServiceObj = inject(UserDetailService);
//   const UserSignupServiceObj = inject(UserSignupService)
//   // const role = userDetailServiceObj.getUserRole();
//   const token = UserSignupServiceObj.getToken();
//   if (token != "") {
//     if (role == "member" || role =="manager" ) {
//       return true;
//     }
//     else {
//       alert("Not accessible")
//       router.navigate(['/home'])
//       return false;
//     }
//   }
//   else {
//     alert("login to access this page")
//     router.navigate(['/login'])
//     return false
//   }
// };

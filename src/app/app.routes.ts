import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent,
        title:"Home"
    },
    {
        path:'Signup',
        loadComponent: ()=> import('./pages/user-signup/user-signup.component').then((m) => m.UserSignupComponent),
        title:"Signup"
    }
];

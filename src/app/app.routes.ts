import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './gaurd/auth.guard';
import { ismanagerGuard } from './gaurd/ismanager.guard';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent,
        title:"home"
    },
    {
        path:"home",
        component:HomeComponent,
        title:"home"
    },
    {
        path:'signup',
        loadComponent: ()=> import('./pages/user-signup/user-signup.component').then((m) => m.UserSignupComponent),
        title:"Signup"
    },
    {
        path:'login',
        loadComponent: ()=> import("./pages/login/login.component").then((m)=>m.LoginComponent),
        title:'login'
    },
    {
        path:'projects',
        loadComponent: ()=> import('./pages/projects-list/projects-list.component').then((m) => m.ProjectsListComponent),
        title:"projects",
        canActivate:[authGuard]
    },
    {
        path:'tasks',
        loadComponent:()=> import("./pages/tasks-list/tasks-list.component").then((m)=>m.TasksListComponent),
        title:"Tasks",
        canActivate:[authGuard]
    },
    {
        path:'myaccount',
        loadComponent:()=> import('./pages/myaccount/myaccount.component').then((m)=>m.MyaccountComponent),
        title:'My Account',
        canActivate:[authGuard]
    },
    {
        path:'dashboard',
        loadComponent: ()=> import('./pages/navigations/dashboard/dashboard.component').then((m)=>(m.DashboardComponent)),
        title:"dashboard", 
        canActivate:[authGuard]
    },
    {
        path:'aboutus',
        loadComponent:()=> import("./pages/aboutus/aboutus.component").then((m)=>m.AboutusComponent),
        title:"About Us"
    }
];

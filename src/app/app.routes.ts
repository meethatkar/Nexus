import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './gaurd/auth.guard';
// import { ismanagerGuard } from './gaurd/ismanager.guard';
// import { ismemberGuard } from './gaurd/ismember.guard';
// import { hasRoleGuard } from './gaurd/has-role.guard';

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
        loadComponent: ()=> import('./pages/users/user-signup/user-signup.component').then((m) => m.UserSignupComponent),
        title:"Signup"
    },
    {
        path:'createproject',
        loadComponent:()=> import('./pages/users/create-project/create-project.component').then((m) => m.CreateProjectComponent),
        title:"create Project",
    },
    // {
    //     path:'question',
    //     loadComponent: ()=> import('./pages/users/question/question.component').then((m) => m.QuestionComponent),
    //     title:"Select Role",
    //     canActivate:[authGuard]
    // },
    {
        path:'login',
        loadComponent: ()=> import("./pages/users/login/login.component").then((m)=>m.LoginComponent),
        title:'login'
    },
    {
        path:'members',
        loadComponent: ()=> import('./pages/member-list/member-list.component').then((m)=>m.MemberListComponent),
        title:'Members'
    },
    {
        path: 'addmember',
        loadComponent: ()=> import('./pages/users/add-member/add-member.component').then((m)=>m.AddMemberComponent),
        title: 'Add Member'
    },
    {
        path:'projects',
        loadComponent: ()=> import('./pages/projects-list/projects-list.component').then((m) => m.ProjectsListComponent),
        title:"projects",
        // canActivate:[hasRoleGuard]
        canActivate:[authGuard]
    },
    {
        path:'tasks',
        loadComponent:()=> import("./pages/tasks-list/tasks-list.component").then((m)=>m.TasksListComponent),
        title:"Tasks",
        // canActivate:[hasRoleGuard]
        canActivate:[authGuard]
    },
    {
        path:'assigntask',
        loadComponent:()=> import("./pages/task-form/task-form.component").then((m)=>m.TaskFormComponent),
        title:"Assign Task Form",
        // canActivate:[ismanagerGuard]
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
        // canActivate:[hasRoleGuard]
        canActivate:[authGuard]
    },
    {
        path:'aboutus',
        loadComponent:()=> import("./pages/aboutus/aboutus.component").then((m)=>m.AboutusComponent),
        title:"About Us"
    },
    {
        path:'**',
        loadComponent:()=> import('./pages/error-page/error-page.component').then((m)=>m.ErrorPageComponent),
        title:"404 Not Found"
    }
];

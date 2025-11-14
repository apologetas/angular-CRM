import { Routes } from '@angular/router';
import { NewCompany } from './components/new-company/new-company';
import { Dashboard } from './components/dashboard/dashboard';
import {AuthLayout} from './layouts/auth-layout/auth-layout';
import {MainLayout} from './layouts/main-layout/main-layout';
import {Register} from './components/auth/register/register';
import {Login} from './components/auth/login/login';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent:()=> import('./components/auth/login/login').then(m => m.Login),
      },
      { path: 'register',
        component: Register,
      },
      { path:'',
        redirectTo: 'login',
        pathMatch: 'full'}
    ],

  },

  {
    path: 'dashboard',
    component: MainLayout,
    children: [

      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'add-company',
        component: NewCompany
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

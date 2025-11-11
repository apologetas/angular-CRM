import { Routes } from '@angular/router';
import { NewCompany } from './components/new-company/new-company';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    pathMatch: 'full'
  },
  {
    path: 'add-company',
    component: NewCompany
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

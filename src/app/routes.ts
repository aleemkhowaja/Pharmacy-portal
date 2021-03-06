import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { AddClientComponent } from './client/add-client/add-client.component';

export const appRoutes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'client',
    component: ClientComponent,
    data: { title: 'Client' },
  },
  {
    path: 'add-client/:id',
    component: AddClientComponent,
    data: { title: 'Add Client' },
  },
  // { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

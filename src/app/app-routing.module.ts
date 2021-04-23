import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  } from './employee/create/create.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { HomeComponent } from './home/home.component';
import { SearchClientComponent } from './client/search-client/search-client.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login'}
  }
,
  {
    path: 'client',
    component: ClientComponent,
    data: { title: 'Client'}
  }
  ,
  {
    path: 'add-client',
    component: AddClientComponent,
    data: { title: 'Add Client'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents  = [
    EmployeeComponent,
    HomeComponent, 
    LoginComponent,
    SearchClientComponent,
    ClientComponent, 
    AddClientComponent];

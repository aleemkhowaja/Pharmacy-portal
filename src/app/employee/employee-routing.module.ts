import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EmployeeComponent } from './employee.component';
import { ViewSingleComponent } from './single-view/view-single.component';
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    data: { title: 'Employee'}
  } 
,
  {
    path: 'create-employee',
    component: CreateComponent,
    data: { title: 'Create Employee'}
  }

  ,
  {
    path: 'get-employee',
    component: ViewSingleComponent,
    data: { title: 'View Single Employee'}
  }
  ,
  {
    path: 'view-employee',
    component: ViewSingleComponent,
    data: { title: 'View Single Employee'}
  },
  {
    path: 'views-employee',
    component: ViewsComponent,
    data: { title: 'View Single Employee'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

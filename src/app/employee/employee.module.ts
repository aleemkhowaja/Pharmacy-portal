import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewSingleComponent } from './single-view/view-single.component';
import { ViewsComponent } from './views/views.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [CreateComponent, ViewSingleComponent, ViewsComponent, UpdateComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,FormsModule
  ]
})
export class EmployeeModule { }

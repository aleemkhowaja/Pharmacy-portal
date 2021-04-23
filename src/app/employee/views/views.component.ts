import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.services';
@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {

  constructor(private employeeService :EmployeeService) { }
  employeeModelList: any= [];

  ngOnInit(): void {
  }

getAllEmployee(){
    this.employeeService.getAll().pipe().subscribe(response =>{
      this.employeeModelList = response;
    })
}

}

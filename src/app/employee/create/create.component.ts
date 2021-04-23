import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from '../../../models/employee'; 
import {EmployeeService} from '../employee.services';
@Component({ 
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  employeeModel = new EmployeeModel();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(

    private http: HttpClient, private employeeService: EmployeeService

  ) { }

  ngOnInit(): void 
  {
  }
  
addEmployee(){
  let a=  this.employeeService.addEmp(this.employeeModel);
  a.subscribe(data=>{
    console.log(data.message, 'Success!');
  });


}



}

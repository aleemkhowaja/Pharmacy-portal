import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from '../../models/employee'
import { Observable } from 'rxjs';
import {EmployeeService} from '../employee/employee.services';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  emp: EmployeeModel[]=[];
  totalItems: any;

  employeeModel = new EmployeeModel();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(

    private http: HttpClient,private  employeeService :EmployeeService

  ) { }

  ngOnInit(): void {
    
    this.getAllUsersWithRoles().subscribe((data: any[])=>{
      console.log(data[1].name);
    }) 
  }


addEmployee(){
  this.employeeService.addEmp(this.employeeModel).subscribe(response=> {
    console.log('response ',response);
    const token=response.token;
    console.log('Tokennn ',token);

    
  });



}




search(): void {
  this.selectUserList();

}


getAllUsersWithRoles(): Observable<any> {
  return this.http.get('http://localhost:8082/pharmacyportal/employee/getAll');
}

selectUserList() {
  this
    .getAllUsersWithRoles()
    .pipe()
    .subscribe(response => {
      this.emp = response.data;
      this.totalItems = response.totalElements;
      console.log(this.emp+"---------------");

    });
}





}

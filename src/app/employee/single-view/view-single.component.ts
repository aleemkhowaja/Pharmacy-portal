import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/models/employee';
import{EmployeeService} from '../employee.services';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.css']
})
export class ViewSingleComponent implements OnInit {
  employeeId: number=0;
  employee: EmployeeModel = new EmployeeModel();
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
 
  constructor(private employeeService:EmployeeService,
    ) { 
    
  }

  ngOnInit(): void {
   

  }

  employeeDelete() {
    this.employeeService.delete(this.employeeId).subscribe(data => {
      if (data != null) {
        if (data.code === 1) {
          alert(data.message);
          //this.router.navigate(['/year/viewYearRanges'], { replaceUrl: true });
        } else if (data.code == 0) {
          
          alert(data.message);
        }
      }
    });
  }


  getEmployeeById() {
    this.employeeService.getEmployeeById(this.employee.id).subscribe(data => {
      this.employee = data;
      console.log(this.employee);
    });
  }

}

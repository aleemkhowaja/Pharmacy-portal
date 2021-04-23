import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, Subject, throwError } from 'rxjs';
import {EmployeeModel} from "../../models/employee";
import {GenericService} from "../generic.service";


@Injectable({
  providedIn: 'root'
}) 
export class EmployeeService {
  serverURL: string="";
 
  constructor(private http: HttpClient, private genericService: GenericService){
    this.serverURL = genericService.getURLServer();

  }


    addEmp(context:EmployeeModel): Observable<any> {
        console.log(context)
        return this.http.post(this.serverURL +'employee/create', { 
          name: context.name,
          email: context.email,
          designation: context.designation,
          salary:context.salary
        });
      }
 
    
    
    
      delete(empId: number): Observable<any>{
        return this.http.post(this.serverURL +'employee/delete', empId);
      }
    
      getAll(){
        return this.http.get(this.serverURL +'employee/getAll');
      }
      update(employeeModel: EmployeeModel): Observable<any>{
        return this.http.post(this.serverURL +'employee/update', employeeModel);
      }
      getEmployeeById(empId: number): Observable<any>{
        return this.http.post(this.serverURL +'employee/view',empId);
      }
    
    

}
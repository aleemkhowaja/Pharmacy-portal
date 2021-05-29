import { Observable } from 'rxjs';
import { ALL_DOCTORS_URL } from './doctor-constant';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private apollo: Apollo) { }

    /**
   * return all doctors
   * @returns 
   */
     filter() : Observable<any> 
     {
       return this.apollo.query<any>({
         query: ALL_DOCTORS_URL,
         variables : {
         },
       });
     }
}

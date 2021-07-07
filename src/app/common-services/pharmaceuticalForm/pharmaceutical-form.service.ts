import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ALL_PHARMACEUTICAL_URL } from './Pharmaceutical-constant';

@Injectable({
  providedIn: 'root'
})
export class PharmaceuticalFormService {

  constructor(private apollo: Apollo) { }

  /**
   * return all country
   * @returns 
   */
   filter() : Observable<any> 
   {
     return this.apollo.query<any>({
       query: ALL_PHARMACEUTICAL_URL,
       variables : {
       },
     });
   }
}

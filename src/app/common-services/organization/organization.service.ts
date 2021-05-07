import { ALL_ORGANZATION_URL } from './constant';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private apollo: Apollo) { }

    /**
   * return all managers
   * @returns 
   */
     filter() : Observable<any> 
     {
       return this.apollo.query<any>({
         query: ALL_ORGANZATION_URL,
         variables : {
         },
       });
     }
}

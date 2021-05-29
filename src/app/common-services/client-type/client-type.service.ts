import { ALL_TYPE_URL } from './client-type-constant';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientTypeService {

  constructor(private apollo: Apollo) { }

  /**
   * return all users
   * @returns 
   */
   filter() : Observable<any> 
   {
     return this.apollo.query<any>({
       query: ALL_TYPE_URL,
       variables : {
       },
     });
   }

}

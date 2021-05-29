import { ALL_USER_URL } from './manager-constant';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private apollo: Apollo) { }

  /**
   * return all managers
   * @returns 
   */
   filter() : Observable<any> 
   {
     return this.apollo.query<any>({
       query: ALL_USER_URL,
       variables : {
       },
     });
   }

}

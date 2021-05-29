import { ALL_DCI_URL } from './dci-constant';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DciService {

  constructor(private apollo: Apollo) { }

      /**
      * return all dci
      * @returns 
      */
       filter() : Observable<any> 
       {
         return this.apollo.query<any>({
           query: ALL_DCI_URL,
           variables : {
           },
         });
       }

}

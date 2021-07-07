import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ALL_CATEGORIES_URL } from './categories-constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apollo: Apollo) { }

  /**
   * return all country
   * @returns 
   */
   filter() : Observable<any> 
   {
     return this.apollo.query<any>({
       query: ALL_CATEGORIES_URL,
       variables : {
       },
     });
   }
}

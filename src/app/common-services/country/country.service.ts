import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ALL_COUNTRY_URL } from './country-constant';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apollo: Apollo) { }


  /**
   * return all country
   * @returns 
   */
  filter() : Observable<any> 
  {
    return this.apollo.query<any>({
      query: ALL_COUNTRY_URL,
      variables : {
      },
    });
  }
}

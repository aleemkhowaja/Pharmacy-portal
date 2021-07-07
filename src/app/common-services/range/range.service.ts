import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ALL_RANGE_URL } from './range-constant';

@Injectable({
  providedIn: 'root'
})
export class RangeService {

  constructor(private apollo: Apollo) { }

  filter() : Observable<any> 
  {
    return this.apollo.query<any>({
      query: ALL_RANGE_URL,
      variables : {
      },
    });
  }
}

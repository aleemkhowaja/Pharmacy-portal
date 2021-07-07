import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ALL_SUBRANGE_URL } from './subrange-constant';

@Injectable({
  providedIn: 'root'
})
export class SubrangeService {

  constructor(private apollo: Apollo) { }

  filter() : Observable<any> 
  {
    return this.apollo.query<any>({
      query: ALL_SUBRANGE_URL,
      variables : {
      },
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ALL_THERAPEUTICCLASSES_URL } from './TherapeuticClasses-constant';

@Injectable({
  providedIn: 'root'
})
export class TherapeuticClassesService {

  constructor(private apollo: Apollo) { }

  filter() : Observable<any> 
  {
    return this.apollo.query<any>({
      query: ALL_THERAPEUTICCLASSES_URL,
      variables : {
      },
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

const allClients = gql`query{
  getAllCustomers{
      id,
      manager,
      firstName,
      lastName,
      type,
      cin,
      cnss,
      email,
      phone,
      creditLimit,
      organization {
          name
      },
      affiliateNumber,
      address,
      city,
      postalCode,
      country{
          name
      },
      description
  }
}`;

@Injectable({
  providedIn: 'root'
})



export class ClientService {


  constructor(private http: HttpClient, private apollo: Apollo) { }


  getAll() : Observable<any> 
  {
    return this.apollo.watchQuery<any>({
      query: allClients,
    }).valueChanges;
  }




}

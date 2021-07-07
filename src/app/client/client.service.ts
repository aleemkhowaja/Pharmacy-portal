
import { ALL_CLIENT_URL, GET_BY_ID, SAVE_CLIENT_URL, UPDATE_CLIENT_URL } from './constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ClientModel } from 'src/models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  lstCients: any = [
    {
      id: 1,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 2,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 3,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 4,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 5,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 6,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 7,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 8,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 9,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
    {
      id: 10,
      lastName: 'Mark',
      type: 'Regular Client',
      email: 'Mark@gmail.com',
      phone: '8156466558',
      cin: '2565AFAJ',
      cnss: '2565AFAJ-6',
      balanced: 1331,
    },
];
  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAll(pageNum: number, itemPerPage: number) : Observable<any> 
  {
    return this.apollo.query<any>({
      query: ALL_CLIENT_URL,
      variables : {
        pageNumber : pageNum-1,
        pageSize : itemPerPage,
        sortOrder : "DESC",
        sortBy : "id",
      },
    });
  }


  filter(pageNum: number, itemPerPage: number, client: ClientModel) : QueryRef<any>
  {
    return this.apollo.watchQuery<any>({
      query: ALL_CLIENT_URL,

      variables : {
        pageNumber : pageNum-1,
        pageSize : itemPerPage,
        sortOrder : "DESC",
        sortBy : "id",
        lastName: client.lastName,
        email : client.email,
        phone : client.phone,
        cin : client.cin,
        cnss : client.cnss,
        balance : client.creditLimit,
        typeId : client.typeId
      }
    });
  }

  save(client: ClientModel) : Observable<any> {
    return this.apollo.mutate({
      mutation: SAVE_CLIENT_URL,
      variables: {
        manager: client.manager,
        doctor : client.doctor,
        firstName: client.firstName,
        lastName : client.lastName,
        type : client.type,
        cin : client.cin,
        cnss : client.cnss,
        email : client.email,
        phone : client.phone,
        creditLimit : client.creditLimit,
        orgId : client.organization,
        registerationNumber : client.registerationNumber,
        affiliateNumber : client.affiliateNumber,
        address : client.address,
        city : client.city,
        postalCode : client.postalCode,
        countryId  : client.country,
        description : client.description,
        createdBy : localStorage.getItem("username")
      }
    });
}

update(client: ClientModel) : Observable<any> {
  return this.apollo.mutate({
    mutation: UPDATE_CLIENT_URL,
    variables: {
      id : client.id,
      manager: client.manager,
      doctor : client.doctor,
      firstName: client.firstName,
      lastName : client.lastName,
      type : client.type,
      cin : client.cin,
      cnss : client.cnss,
      email : client.email,
      phone : client.phone,
      creditLimit : client.creditLimit,
      orgId : client.organization,
      registerationNumber : client.registerationNumber,
      affiliateNumber : client.affiliateNumber,
      address : client.address,
      city : client.city,
      postalCode : client.postalCode,
      countryId  : client.country,
      description : client.description,
      modifiedBy : localStorage.getItem("username")
    }
  });
}

  getById(id: number) : QueryRef<any>  {
    return this.apollo.watchQuery<any>({
      query : GET_BY_ID,
      variables : {
        customerId : id
      },
    });
  }

}

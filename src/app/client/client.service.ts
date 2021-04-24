import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ClientModel } from 'src/models/client';

const allClients = gql`
  query {
    getAllCustomers {
      id
      manager
      firstName
      lastName
      type
      cin
      cnss
      email
      phone
      creditLimit
      organization {
        name
      }
      affiliateNumber
      address
      city
      postalCode
      country {
        name
      }
      description
    }
  }
`;

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

  getAll(pageNumber: number, itemPerPage: number): Observable<ClientModel[]> {
    return this.lstCients.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
  }

  getSpecificClient(id: number) {
    return this.lstCients.find((x: any) => x.id === id);
  }

  save() {
    console.log(name);
  }
}

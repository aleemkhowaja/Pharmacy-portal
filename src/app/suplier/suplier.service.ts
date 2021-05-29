import { ALL_SUPPLIER_URL, SAVE_SUPPLIER_URL } from './constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { ProductModel } from 'src/models/product';
import { SuplierModel } from 'src/models/suplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuplierService {
  lstSupliers: any = [
    {
      id: 1,
      name: 'Daniel Rodriguez',
      phone: "+983318938726",
      email: "daniel@gmail.com",
      fax: "Daniel fax",
      internetSite: "daniel.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 2,
      name: 'Jhon Snow',
      phone: "+983318938726",
      email: "daniel@gmail.com",
      fax: "Daniel fax",
      internetSite: "daniel.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 3,
      name: 'Homero Simpson',
      phone: "+983318938726",
      email: "simpson@gmail.com",
      fax: "Simson fax",
      internetSite: "daniel.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 4,
      name: 'Donatello',
      phone: "+983318938726",
      email: "donatello@gmail.com",
      fax: "Donatello fax",
      internetSite: "donatello.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 5,
      name: 'Leonardo',
      phone: "+983318938726",
      email: "leonardo@gmail.com",
      fax: "Leonardo fax",
      internetSite: "leonardo.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 6,
      name: 'Arya Stark',
      phone: "+983318938726",
      email: "arya@gmail.com",
      fax: "Arya fax",
      internetSite: "arya.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 7,
      name: 'Alex Rodriguez',
      phone: "+983318938726",
      email: "alex@gmail.com",
      fax: "Alex fax",
      internetSite: "alex.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 8,
      name: 'Jhon Lennon',
      phone: "+983318938726",
      email: "jhon@gmail.com",
      fax: "Jhon fax",
      internetSite: "jhon.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 9,
      name: 'Mark Zuckemberg',
      phone: "+983318938726",
      email: "mark@gmail.com",
      fax: "Mark fax",
      internetSite: "daniel.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },
    {
      id: 10,
      name: 'Pepe Perez',
      phone: "+983318938726",
      email: "pepe@gmail.com",
      fax: "Pepe fax",
      internetSite: "daniel.com",
      address: "X street",
      city: "Buenos Aires",
      zipCode: "85092",
      country: "Argentina",
      description: "Good pharmaceutic",
      balance: '0',
      suplier: 'Nil'
    },



  ];

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAll(pageNumber: number, itemPerPage: number): Observable<SuplierModel[]> {
    return this.lstSupliers.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
  }

  filter(pageNum: number, itemPerPage: number, supplier: SuplierModel) : QueryRef<any>
  {
    return this.apollo.watchQuery<any>({
      query: ALL_SUPPLIER_URL,

      variables : {
        pageNumber : pageNum-1,
        pageSize : itemPerPage,
        sortOrder : "DESC",
        sortBy : "id",
        lastName: supplier.lastName,
        telephone : supplier.telephone,
        city : supplier.city
      }
    });
  }


  getById(id: number) {
    return this.lstSupliers.find((x: any) => x.id == id);
  }

  save(suplier: SuplierModel) : Observable<any>{
    return this.apollo.mutate({
      mutation: SAVE_SUPPLIER_URL,
      variables: {
        id : suplier.id,
        country : suplier.country,
        lastName : suplier.lastName,
        email : suplier.email,
        phone : suplier.telephone,
        fax : suplier.fax,
        website : suplier.website,
        address : suplier.address,
        city : suplier.city,
        postalCode : suplier.postalCode,
        description : suplier.description,
        createdBy : localStorage.getItem("username")
      }
    });
  }

  getDetailsSupliers() {
    return this.lstSupliers;
  }

  search(filters: any) {
    return this.lstSupliers.filter((x: any) => {
      return (!filters.name || x.name.includes(filters.name))
              && (!filters.phone || x.phone.includes(filters.phone))
              && (!filters.city || x.city.includes(filters.city))
              && (!filters.balance || x.balance.includes(filters.balance))
              && (!filters.suplier || x.suplier.includes(filters.suplier));
    });
  }
}

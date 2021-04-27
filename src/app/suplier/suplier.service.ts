import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ProductModel } from 'src/models/product';
import { SuplierModel } from 'src/models/suplier';
import Observable from 'zen-observable';

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

  getById(id: number) {
    return this.lstSupliers.find((x: any) => x.id == id);
  }

  save(suplier: SuplierModel) {
    console.log(name);
  }

  getDetailsSupliers() {
    return this.lstSupliers;
  }
}

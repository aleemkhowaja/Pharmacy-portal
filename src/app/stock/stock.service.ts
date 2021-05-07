import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { StockModel } from 'src/models/stock';
import Observable from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  lstStock: any = [
    {
      id: 1,
      product: 'IBRIM CL 10.0% EARS DROPS',
      inStore: 5,
      reserved: 2,
      available: 1,
      orders: 3,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 2,
      product: 'IBRIM CL 0.2% EYE DROPS',
      inStore: 1,
      reserved: 0,
      available: 1,
      orders: 0,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 3,
      product: 'IBRIM CL 5% HAIR WASH',
      inStore: 4,
      reserved: 1,
      available: 2,
      orders: 1,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 4,
      product: 'IBRIM CL 1.1% NOSE DROPS',
      inStore: 15,
      reserved: 2,
      available: 13,
      orders: 10,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 5,
      product: 'IBRIM CL 0.2% EYE DROPS',
      inStore: 1,
      reserved: 0,
      available: 1,
      orders: 0,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 6,
      product: 'IBRIM CL 0.2% EYE DROPS',
      inStore: 1,
      reserved: 0,
      available: 1,
      orders: 0,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 7,
      product: 'IBRIM CL 0.2% EYE DROPS',
      inStore: 1,
      reserved: 0,
      available: 1,
      orders: 0,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 8,
      product: 'IBRIM CL 0.2% EYE DROPS',
      inStore: 1,
      reserved: 0,
      available: 1,
      orders: 0,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 9,
      product: 'IBRIM CL 0.2% EYE DROPS',
      inStore: 1,
      reserved: 0,
      available: 1,
      orders: 0,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
    {
      id: 10,
      product: 'IBRIM CL 0.2% EYE DROPS',
      inStore: 1,
      reserved: 0,
      available: 1,
      orders: 0,
      pph: 63.34,
      ppv: 95.87,
      zone: "NIL",
      expirationDate: "30-09-2021",
      barCode: "3000092021",
      barCode2: '3078802021'
    },
  ];

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAll(pageNumber: number, itemPerPage: number): Observable<StockModel[]> {
    return this.lstStock.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
  }

  getById(id: number) {
    return this.lstStock.find((x: any) => x.id == id);
  }

  save(suplier: StockModel) {
    console.log(name);
  }

  getDetailsSupliers() {
    return this.lstStock;
  }

  search(filters: any) {
    return this.lstStock.filter((x: any) => {
      return (!filters.product || x.product.includes(filters.product)) && (!filters.ppvValue || x.ppvValue == filters.ppvValue)
              && (!filters.inStore || x.inStore == filters.inStore) && (!filters.available || x.available == filters.available)
              && (!filters.orders || x.orders == filters.orders) && (!filters.pphValue || x.pphValue == filters.pphValue)
              && (!filters.zone || x.zone.includes(filters.zone)) && (!filters.barCode || x.barCode.includes(filters.barCode))
              && (!filters.barCode2 || x.barCode2.includes(filters.barCode2));
    });
  }
}

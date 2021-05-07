import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { InventoryModel } from 'src/models/inventory';
import Observable from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  lstInventory: any = [
    {
      id: 1,
      transactionNumber: 'INV-340',
      date: "22-12-2025",
      method: "XYZ",
      galenicForm: "Galenic",
      zone: "1",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "A bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 1,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 2,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 3,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        }
      ]
    },
    {
      id: 2,
      transactionNumber: 'INV-341',
      date: "06-02-2021",
      method: "ZZZ",
      galenicForm: "Nil",
      zone: "2",
      status: "Complete",
      contains: '3',
      comment: 90.00,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "Different bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 4,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 5,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 6,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        }
      ]
    },
    {
      id: 3,
      transactionNumber: 'INV-342',
      date: "10-11-2019",
      method: "TTTT",
      galenicForm: "Austrolopitecus",
      zone: "3",
      status: "Incomplete",
      contains: '3',
      comment: 100.72,
      totalPPV: 35.88,
      totalPPH: "NIL",
      totalDeviation: "31-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
    {
      id: 4,
      transactionNumber: 'INV-343',
      date: "05-05-2020",
      method: "RRR",
      galenicForm: "Nil",
      zone: "3",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
    {
      id: 5,
      transactionNumber: 'INV-344',
      date: "06-02-2021",
      method: "Bar Code",
      galenicForm: "Nil",
      zone: "2",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
    {
      id: 6,
      transactionNumber: 'INV-345',
      date: "06-02-2021",
      method: "YYY",
      galenicForm: "Nil",
      zone: "2",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
    {
      id: 7,
      transactionNumber: 'INV-346',
      date: "06-02-2021",
      method: "Bar Code",
      galenicForm: "Nil",
      zone: "2",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
    {
      id: 8,
      transactionNumber: 'INV-347',
      date: "06-02-2021",
      method: "Bar Code",
      galenicForm: "Nil",
      zone: "2",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
    {
      id: 9,
      transactionNumber: 'INV-348',
      date: "06-02-2021",
      method: "Bar Code",
      galenicForm: "Nil",
      zone: "2",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
    {
      id: 10,
      transactionNumber: 'INV-349',
      date: "06-02-2021",
      method: "Bar Code",
      galenicForm: "Nil",
      zone: "2",
      status: "Complete",
      contains: '3',
      comment: 63.34,
      totalPPV: 95.87,
      totalPPH: "NIL",
      totalDeviation: "30-09-2021",
      dci: "3",
      barCode: "the inventory bar code",
      name: "asdasdasdasd",
      products: [
        {
          id: 7,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 8,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
        {
          id: 9,
          name: "METEOSPASMYL CO B20 CAPSULES",
          pph: "33,93",
          inStock: 0,
          actualQuantity: 1,
          difference: 1,
          ppvValue: 51.35,
          pphValue: 33.35,
          stockMin: 0,
          stockMax: 0,
          ppv: "25.0",
          form: "VARNISH"
        },
      ]
    },
  ];

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAll(pageNumber: number, itemPerPage: number): Observable<InventoryModel[]> {
    return this.lstInventory.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
  }

  getById(id: number) {
    return this.lstInventory.find((x: any) => x.id == id);
  }

  save(suplier: InventoryModel) {
    console.log(name);
  }

  getDetailsInventorys() {
    return this.lstInventory;
  }

  search(filters: any) {
    return this.lstInventory.filter((x: any) => {
      return (!filters.transactionNumber || x.transactionNumber.includes(filters.transactionNumber))
              && (!filters.method || x.method.includes(filters.method))
              && (!filters.galenicForm || x.galenicForm.includes(filters.galenicForm))
              && (!filters.zone || x.zone.includes(filters.zone))
              && (!filters.status || x.status.includes(filters.status));
    });
  }
}

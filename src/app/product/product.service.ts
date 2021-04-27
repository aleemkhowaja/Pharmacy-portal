import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  lstProducts: any = [
    {
      id: 1,
      product: 'BIOFAR CO CALCIUM Protein D5 B23 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: false,
      active: false,
      laboratory: "NIL",
      dci: "NIL",
      status: "Rejeté",
    },
    {
      id: 2,
      product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: false,
      active: false,
      laboratory: "NIL",
      dci: "NIL",
      status: "Rejeté"
    },
    {
      id: 3,
      product: 'BIOFAR CO CALCIUM GlUTAMINE D3 B50 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: true,
      active: true,
      laboratory: "NIL",
      dci: "NIL",
      status: "Valide"
    },
    {
      id: 4,
      product: 'BIOFAR CO CALCIUM CREATINE D3 B80 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: true,
      active: true,
      laboratory: "NIL",
      dci: "NIL",
      status: "Valide"
    },
    {
      id: 5,
      product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: true,
      active: true,
      laboratory: "NIL",
      dci: "NIL",
      status: "Rejeté"
    },
    {
      id: 6,
      product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: false,
      active: false,
      laboratory: "NIL",
      dci: "NIL",
      status: "Rejeté"
    },
    {
      id: 7,
      product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: true,
      active: true,
      laboratory: "NIL",
      dci: "NIL",
      status: "Rejeté"
    },
    {
      id: 8,
      product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: true,
      active: true,
      laboratory: "NIL",
      dci: "NIL",
      status: "Valide"
    },
    {
      id: 9,
      product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: false,
      active: false,
      laboratory: "NIL",
      dci: "NIL",
      status: "Valide"
    },
    {
      id: 10,
      product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
      name: 'Mark',
      category: "Drugstore (33.330%)",
      pharmaceuticalForm: 'ACCESSORIES',
      ppv: 75.00,
      pph: 13.33,
      barcode: 'gfgfg45454',
      zone: true,
      active: true,
      laboratory: "NIL",
      dci: "NIL",
      status: "Valide"
    },
    
    
  ];

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAll(pageNumber: number, itemPerPage: number): Observable<ProductModel[]> {
    return this.lstProducts.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
  }

  getSpecificProduct(id: number) {
    return this.lstProducts.find((x: any) => x.id == id);
  }

  save(product: ProductModel) {
    console.log(name);
  }

  getDetailsProducts() {
    return this.lstProducts;
  }
}

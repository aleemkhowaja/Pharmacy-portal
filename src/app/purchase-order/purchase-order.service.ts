import { ProductService } from './../product/product.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/models/product';
import {ALL_PURCHASE, SAVE_PURCHASE} from './purchase-order.constant';
import { ProviderModel } from 'src/models/Provider';

//@Injectable providedIn: 'root' When you provide the service at the root level,
//Angular creates a single,
//shared instance of service and injects it into any class that asks for it
@Injectable({
    providedIn: 'root'
  })
  export class PurchaseOrderService {

    //static product list dummy data 
    lstProducts: any = [
        {
          id: 1,
          product: 'BIOFAR CO CALCIUM Protein D5 B23 COMP EFFER',
          name: 'Jhon',
          category: "Drugstore (33.330%)",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
          pharmaceuticalForm: 'ACCESSORIES',
          ppv: 75.00,
          pph: 13.33,
          barcode: 'gfgfg45454',
          zone: false,
          active: false,
          laboratory: "NIL",
          dci: "1",
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
          status: "Rejeté",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
        },
        {
          id: 3,
          product: 'BIOFAR CO CALCIUM GlUTAMINE D3 B50 COMP EFFER',
          name: 'Philipe',
          category: "Drugstore (33.330%)",
          pharmaceuticalForm: 'ACCESSORIES',
          ppv: 75.00,
          pph: 13.33,
          barcode: 'gfgfg45454',
          zone: true,
          active: true,
          laboratory: "NIL",
          dci: "NIL",
          status: "Valide",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
        },
        {
          id: 4,
          product: 'BIOFAR CO CALCIUM CREATINE D3 B80 COMP EFFER',
          name: 'George',
          category: "Drugstore (33.330%)",
          pharmaceuticalForm: 'ACCESSORIES',
          ppv: 75.00,
          pph: 13.33,
          barcode: 'gfgfg45454',
          zone: true,
          active: true,
          laboratory: "NIL",
          dci: "NIL",
          status: "Valide",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
        },
        {
          id: 5,
          product: 'BIOFAR CO CALCIUM VITAMIN D3 B20 COMP EFFER',
          name: 'Carl',
          category: "Drugstore (33.330%)",
          pharmaceuticalForm: 'ACCESSORIES',
          ppv: 75.00,
          pph: 13.33,
          barcode: 'gfgfg45454',
          zone: true,
          active: true,
          laboratory: "NIL",
          dci: "NIL",
          status: "Rejeté",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
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
          status: "Rejeté",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
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
          status: "Rejeté",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
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
          status: "Valide",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
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
          status: "Valide",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
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
          status: "Valide",
          categoryId: "2",
          galenicForm: "1",
          barcode2: 'gfgfg45454',
          therapeuticClass: "3",
          range: "2",
          subRange: "3",
          productTable: "1",
          vatOnPurchase: "2",
          vatOnSales: "3",
          isRefundable: "1",
          drivingContraindications: "2",
          breastFeedingContraindications: "3",
          pregnancyContraindications: "1",
        },
    
    
      ];
    //end product list    

    
  constructor(private http: HttpClient, 
    private apollo: Apollo,
    private productService: ProductService) {}

    //return all products from product service
    getAllProducts(pageNum: number, itemPerPage: number, product: ProductModel):  QueryRef<any> {
        return this.productService.filter(pageNum, itemPerPage, product);
      }
    //end getAllProducts()


    //return specific product by product id   
    getSpecificProduct(id: number) {
        return this.lstProducts.find((x: any) => x.id == id);
    }
    //end getSpecificProduct()

    filter() : Observable<any>
    {
      return this.apollo.query<any>({
        query: ALL_PURCHASE,
        variables : {
        },
      });
    }

    save(product: ProductModel, provider: ProviderModel) : Observable<any> {
      return this.apollo.mutate({
        mutation: SAVE_PURCHASE,
        variables: {
          product: product.id,
          provider: provider.id
        }
      });
    }
    
    getDetailsProducts() {
        return this.lstProducts;
    }
    
      search(filters: any) {
        return this.lstProducts.filter((x: any) => {
          return (!filters.name || x.name.includes(filters.name)) && (!filters.ppv || x.ppv == filters.ppv)
                  && (!filters.category || x.category.includes(filters.category))
                  && (!filters.barCode || x.category.includes(filters.barcode))
                  && (!filters.pharmaceuticalForm || x.pharmaceuticalForm.includes(filters.pharmaceuticalForm))
                  && (!filters.pph || x.pph == filters.pph)
                  && (!filters.zone || x.zone == (filters.zone == 'Oui'))
                  && (!filters.active || x.active == (filters.active == 'Oui'));
        });
      }
    

  }
import { ALL_TRANSACTION_URL, GET_BY_ID, SAVE_SALE_URL } from './sale-constant';
import { SaleModel } from 'src/models/sale';
import { ProductService } from './../product/product.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
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

  constructor(private http: HttpClient, 
              private apollo: Apollo,
              private productService: ProductService) {}


              
  getAllProducts(pageNum: number, itemPerPage: number, product: ProductModel):  QueryRef<any> {
    return this.productService.filter(pageNum, itemPerPage, product);
  }

  getSpecificProduct(id: number) {
    return this.lstProducts.find((x: any) => x.id == id);
  }

  filter(pageNum: number, itemPerPage: number, saleModel: SaleModel) : QueryRef<any>
  {
    return this.apollo.watchQuery<any>({
      query: ALL_TRANSACTION_URL,

      variables : {
        pageNumber : pageNum-1,
        pageSize : itemPerPage,
        sortOrder : "DESC",
        sortBy : "id",
        transactionNumber: saleModel.transactionNumber,
        customerName : saleModel.customerName,
        amount : saleModel.amount ,
        transDate : saleModel.transDate,
        quantity : saleModel.quantity,
        transStatus : saleModel.transStatus,
        reference : saleModel.reference,
        isDelivered : saleModel.isDelivered,
        transType : "sale"
      }
    });
  }


  save(saleModel: SaleModel) : Observable<any> {
      return this.apollo.mutate({
        mutation: SAVE_SALE_URL,
        variables: {
          quanity: saleModel.quantity,
          amount : saleModel.amount,
          transStatus : 'Completed',
          reference: saleModel.reference,
          isDelivered : saleModel.isDelivered,
          type : 'sale',
          paymentMethod : saleModel.paymentMethod,
          customerId : saleModel.customerId,
          createdBy : localStorage.getItem("username"),
          modifiedBy : localStorage.getItem("username")
        }
      });
  }

  getById(id: number) : QueryRef<any>  {
    return this.apollo.watchQuery<any>({
      query : GET_BY_ID,
      variables : {
        transactionId : id
      },
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

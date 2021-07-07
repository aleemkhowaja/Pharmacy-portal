import { ALL_PRODUCT_URL, UPDATE_PRODUCT_URL, UPDATE_PRODUCT_URL1, GET_PRODUCT_BY_ID, SAVE_PRODUCT_URL } from './product-constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAll(pageNumber: number, itemPerPage: number): Observable<any> {
    return this.apollo.query<any>({
      query: ALL_PRODUCT_URL,
      variables: {
        pageNumber: pageNumber - 1,
        pageSize: itemPerPage,
        sortOrder: "DESC",
        sortBy: "id",
      },
    });
  }

  filter(pageNum: number, itemPerPage: number, product: ProductModel) : QueryRef<any>
  {
    console.log("product service ::"+product.nameOrBarcode);
    return this.apollo.watchQuery<any>({
      query: ALL_PRODUCT_URL,

      variables : {
        pageNumber : pageNum-1,
        pageSize : itemPerPage,
        sortOrder : "DESC",
        sortBy : "id",
        name: product.name,
        barCode : product.barcode,
        ppv : product.ppv,
        dci : product.dci
      }
    });
  }

  getById(id: number): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCT_BY_ID,
      variables: {
        productId: id
      },
    });
  }

 
  updateWithProperties(product: ProductModel) : Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_PRODUCT_URL1,
      variables: {
        id : product.id,
        pph: product.pph,
        ppv : product.ppv,
        stockMin: product.minStock,
        stockMax : product.maxStock
      }
    });
  }

  save(product: ProductModel) : Observable<any>{
    return this.apollo.mutate({
      mutation: SAVE_PRODUCT_URL,
      variables: {
        name: product.name,
        barCode: product.barcode2,
        barCode2: product.barcode2,
        categoryId: product.categoryId,
        therapeuticClass: product.therapeuticClass,
        therapeuticClassId:product.therapeuticClassId,
        pharmaceuticalFormId: product.pharmaceuticalForm,
        dci: product.dci,
        laboratory: product.laboratory,
        range1: product.range,
        subRange: product.subRange,
        productTable: product.productTable,
        requiresPrescription: product.prescriptionRequired,
        productMarket: product.marketProduct,
        pph: product.pph,
        ppv: product.ppv,
        vatOnPurchase: product.vatOnPurchase,
        vatOnSale: product.vatOnSales,
        isRefundable: product.isRefundable,
        basisOfReimbursement: product.reimbursementBasis,
        presentation: product.presentation,
        excipients: product.excipients,
        adultDosage: product.dosageForAdults,
        dosageForChildren: product.dosageForChildren,
        indications: product.indications,
        contraindicationDriving: product.drivingContraindications,
        breastFeedingContraindication: product.breastFeedingContraindications,
        pregnancyContraindication: product.pregnancyContraindications,
        productLabReference: product.productLabReference,
        conditioning: product.conditioning,
        monoGraph: product.monograph,
        description: product.description,
        createdBy:localStorage.getItem("username")
      }
    });
  }

  update(product: ProductModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_PRODUCT_URL,
      variables: {
        id: product.id,
        name: product.name,
        barCode: product.barcode2,
        barCode2: product.barcode2,
        category: product.category,
        therapeuticClass: product.therapeuticClass,
        pharmaceuticalForm: product.pharmaceuticalForm,
        dci: product.dci,
        laboratory: product.laboratory,
        range1: product.range,
        subRange: product.subRange,
        productTable: product.productTable,
        requiresPrescription: product.prescriptionRequired,
        productMarket: product.marketProduct,
        pph: product.pph,
        ppv: product.ppv,
        vatOnPurchase: product.vatOnPurchase,
        vatOnSale: product.vatOnSales,
        isRefundable: product.isRefundable,
        basisOfReimbursement: product.reimbursementBasis,
        presentation: product.presentation,
        excipients: product.excipients,
        adultDosage: product.dosageForAdults,
        dosageForChildren: product.dosageForChildren,
        indications: product.indications,
        contraindicationDriving: product.drivingContraindications,
        breastFeedingContraindication: product.breastFeedingContraindications,
        pregnancyContraindication: product.pregnancyContraindications,
        productLabReference: product.productLabReference,
        conditioning: product.conditioning,
        monoGraph: product.monograph,
        description: product.description,
        modifiedBy: localStorage.getItem("username")
      }
    });
  }

}

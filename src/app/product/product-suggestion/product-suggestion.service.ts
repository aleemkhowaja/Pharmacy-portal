import {SAVE_PRODUCT_SUGGESTION_URL,UPDATE_PRODUCT_SUGGESTION_URL,ALL_PRODUCT_SUGGESTION_URL,GET_PRODUCT_SUGGESTION_BY_ID} from './product-suggestion-constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductSuggestionModel } from 'src/models/productSuggestionModel';

@Injectable({
  providedIn: 'root'
})
export class ProductSuggestionService {
 
  constructor(private http: HttpClient, private apollo: Apollo) { }

  getAll(pageNumber: number, itemPerPage: number): Observable<any> {
    return this.apollo.query<any>({
      query: ALL_PRODUCT_SUGGESTION_URL,
      variables: {
        pageNumber: pageNumber - 1,
        pageSize: itemPerPage,
        sortOrder: "DESC",
        sortBy: "id",
      },
    });
  }

  getById(id: number): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCT_SUGGESTION_BY_ID,
      variables: {
        productId: id
      },
    });
  }

  filter(pageNum: number, itemPerPage: number, product: ProductSuggestionModel): QueryRef<any> {
    console.log("product service ::" + product.nameOrBarcode);
    return this.apollo.watchQuery<any>({
      query: ALL_PRODUCT_SUGGESTION_URL,

      variables: {
        pageNumber: pageNum - 1,
        pageSize: itemPerPage,
        sortOrder: "DESC",
        sortBy: "id",
        lastName: product.lastName,
        barCode: product.barcode,
        ppv: product.ppv,
        dci: product.dci
      }
    });
  }

  save(product: ProductSuggestionModel) : Observable<any>{
    return this.apollo.mutate({
      mutation: SAVE_PRODUCT_SUGGESTION_URL,
      variables: {
        lastName: product.lastName,
        barCode: product.barcode,
        barCode2: product.barcode2,
        categoryId: product.categoryId,
        therapeuticClass: product.therapeuticClass,
        therapeuticClassId:product.therapeuticClassId,
        pharmaceuticalFormId: product.pharmaceuticalId,
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

  update(product: ProductSuggestionModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_PRODUCT_SUGGESTION_URL,
      variables: {
        id: product.id,
        name: product.lastName,
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

import { ProductService } from './../product/product.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/models/product';
import { ALL_PURCHASE, SAVE_PURCHASE, ALL_TRANSACTION_URL } from './purchase-order.constant';
import { ProviderModel } from 'src/models/Provider';
import { PurchaseModel } from 'src/models/purchase';

//@Injectable providedIn: 'root' When you provide the service at the root level,
//Angular creates a single,
//shared instance of service and injects it into any class that asks for it
@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {


  constructor(private http: HttpClient,
    private apollo: Apollo,
    private productService: ProductService) { }

  //return all products from product service
  getAllProducts(pageNum: number, itemPerPage: number, product: ProductModel): QueryRef<any> {
    return this.productService.filter(pageNum, itemPerPage, product);
  }


  filter(pageNum: number, itemPerPage: number, purchaseModel: PurchaseModel): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: ALL_TRANSACTION_URL,

      variables: {
        pageNumber: pageNum - 1,
        pageSize: itemPerPage,
        sortOrder: "DESC",
        sortBy: "id",
        transactionNumber: purchaseModel.transactionNumber,
        customerName: purchaseModel.customerName,
        amount: purchaseModel.amount,
        transDate: purchaseModel.transDate,
        quantity: purchaseModel.quantity,
        transStatus: purchaseModel.transStatus,
        reference: purchaseModel.reference,
        isDelivered: purchaseModel.isDelivered,
        transType: "purchase"
      }
    });
  }

  save(product: ProductModel, provider: ProviderModel): Observable<any> {
    return this.apollo.mutate({
      mutation: SAVE_PURCHASE,
      variables: {
        product: product.id,
        provider: provider.id
      }
    });
  }






}
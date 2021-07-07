//@Injectable providedIn: 'root' When you provide the service at the root level,
//Angular creates a single,

import { Injectable } from "@angular/core";
import { ProviderModel } from "src/models/Provider";
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/models/product';
import {ALL_DELIVERY, SAVE_DELIVERY} from './delivery-slip.constant';
import { HttpClient } from "@angular/common/http";
import { ProductService } from "../product/product.service";
// import { DeliveryModel } from "src/models/delivery";
import { ManagerModel } from "src/models/manager";

//shared instance of service and injects it into any class that asks for it
@Injectable({
    providedIn: 'root'
  })
  export class DeliverySlipService {
    constructor(private http: HttpClient, 
      private apollo: Apollo) {}
    save(product: ProductModel,managerId: number, provider: ProviderModel, deliveryReference: String) : Observable<any> {
      return this.apollo.mutate({
        mutation: SAVE_DELIVERY,
        variables: {
          product: product.id,
          provider: provider.id,
          manager: managerId,
          deliveryReference: deliveryReference,
          deliveryNoteDate: '2021-02-02',
          deadline: '2021-02-03'
        }
      });
    }

    filter() : Observable<any>
    {
      return this.apollo.query<any>({
        query: ALL_DELIVERY,
        variables : {
        },
      });
    }
    
  }
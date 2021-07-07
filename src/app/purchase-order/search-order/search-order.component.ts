import { Component, OnInit } from '@angular/core';
import {PurchaseOrderService} from '../purchase-order.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
@UntilDestroy()
export class SearchOrderComponent implements OnInit {

  listPurchases: any;

  constructor(private purchaseService: PurchaseOrderService) { }

  ngOnInit(): void {
    this.initPurchases();
  }

  public initPurchases() {
    this.purchaseService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      if(response.data.getAllPurchases.length > 0){
        this.listPurchases = response.data.getAllPurchases;
      }

    });
  }



}

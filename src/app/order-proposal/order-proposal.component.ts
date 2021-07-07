import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';


@Component({
  selector: 'app-order-proposal',
  templateUrl: './order-proposal.component.html',
  styleUrls: ['./order-proposal.component.css']
})
@UntilDestroy()
export class OrderProposalComponent implements OnInit {


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

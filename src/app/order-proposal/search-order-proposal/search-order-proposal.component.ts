import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PurchaseOrderService } from 'src/app/purchase-order/purchase-order.service';

@Component({
  selector: 'app-search-order-proposal',
  templateUrl: './search-order-proposal.component.html',
  styleUrls: ['./search-order-proposal.component.css']
})
@UntilDestroy()
export class SearchOrderProposalComponent implements OnInit {


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

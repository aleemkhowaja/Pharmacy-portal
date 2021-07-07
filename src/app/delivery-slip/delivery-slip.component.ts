import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DeliverySlipService } from './delivery-slip.service';

@Component({
  selector: 'app-delivery-slip',
  templateUrl: './delivery-slip.component.html',
  styleUrls: ['./delivery-slip.component.css']
})
@UntilDestroy()
export class DeliverySlipComponent implements OnInit {

  listDeliveries: any;

  constructor(private deliveryService: DeliverySlipService) { }

  ngOnInit(): void {
    this.initDeliveries();
  }

  public initDeliveries() {
    this.deliveryService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      if(response.data.getAllDeliveries.length > 0){
        this.listDeliveries = response.data.getAllDeliveries;
      }

    });
  }

  

}

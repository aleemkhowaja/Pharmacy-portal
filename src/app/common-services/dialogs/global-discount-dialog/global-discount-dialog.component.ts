import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductModel } from 'src/models/product';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-global-discount-dialog',
  templateUrl: './global-discount-dialog.component.html',
  styleUrls: ['./global-discount-dialog.component.css']
})
export class GlobalDiscountDialogComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  public event: EventEmitter<any> = new EventEmitter();
  @Input() data: ProductModel | undefined

  ngOnInit(): void {
  }

  
  globalDiscountForm = this.fb.group({
    applyTo : [1],
    discountType : [1],
    discount : 0,
  });

  applyToCriteria = [
    { id: 1, name: "Appliquer au total" },
    { id: 2, name: "Rectifier le total" },
    { id: 3, name: "Appliquer à chaque produit"}
  ]

  discountTypes = [
    { id: 1, name: "%" },
    { id: 2, name: "Montant" }
  ]


  /**
   * GlobalDiscountCalculate
   */

   globalDiscountCalculate()
   {
    let formObj = this.globalDiscountForm.getRawValue(); 
    let serializedForm = JSON.stringify(formObj);

    this.triggerEvent(serializedForm);
    this.bsModalRef.hide();

   }

    /**
   * send data to parent component from where dialog has opened.
   * @param customer 
   */
  triggerEvent(saleJSON: string | undefined) {
    this.event.emit({ data: saleJSON , res:200 });
  }
 


}

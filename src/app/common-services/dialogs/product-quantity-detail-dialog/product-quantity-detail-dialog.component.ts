import { SaleModel } from 'src/models/sale';
import { FormBuilder } from '@angular/forms';
import { ProductModel } from './../../../../models/product';
import { ClientModel } from './../../../../models/client';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-product-quantity-detail-dialog',
  templateUrl: './product-quantity-detail-dialog.component.html',
  styleUrls: ['./product-quantity-detail-dialog.component.css'],
  
})
export class ProductQuantityDetailDialogComponent implements OnInit {

  public event: EventEmitter<any> = new EventEmitter();
  @Input() data: ProductModel | undefined

  productQuantityDetailForm = this.fb.group({
    unitQuantity : 0,
    unitPrice:0,
    unitPriceHidden:0,
    discountType : [1],
    discount : 0,
    remUG:0,
    available:0,
    basisOfReimbursement: 0,
    rateOfReim:0,
    expiryDate:['']
  });

  discountTypes = [
    { id: 1, name: "%" },
    { id: 2, name: "Montant" }
]


  constructor( public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productQuantityDetailForm.get('unitQuantity')?.setValue(this.data?.quantity);
    this.productQuantityDetailForm.get('unitPriceHidden')?.setValue(this.data?.ppv);
    this.productQuantityDetailForm.get('unitPrice')?.setValue(this.data?.ppu);
    this.productQuantityDetailForm.get('discount')?.setValue(this.data?.percentage);
  }


  sale!: SaleModel;
  saleReCalculate()
  {

    let formObj = this.productQuantityDetailForm.getRawValue(); 
    let serializedForm = JSON.stringify(formObj);

  //  this.sale.unitQuantity =   this.productQuantityDetailForm.get('unitQuantity')?.value
  //  this.sale.unitPrice =   this.productQuantityDetailForm.get('unitPrice')?.value
  //  this.sale.discountType = this.productQuantityDetailForm.get('discountType')?.value
  //  this.sale.discount = this.productQuantityDetailForm.get('discount')?.value
  //  this.sale.remUG = this.productQuantityDetailForm.get('remUG')?.value
  //  this.sale.available = this.productQuantityDetailForm.get('available')?.value
  //  this.sale.basisOfReimbursement = this.productQuantityDetailForm.get('basisOfReimbursement')?.value
  //  this.sale.rateOfReim = this.productQuantityDetailForm.get('rateOfReim')?.value
  //  this.sale.expiryDate = this.productQuantityDetailForm.get('expiryDate')?.value

  //  this.stringJson = JSON.stringify(this.courseList);

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


 /**
  * calculate the discount
  */
 calculateAfterDiscount() {

  let discount = Number(this.productQuantityDetailForm.get('discount')?.value)
  let actualPrice = Number(this.productQuantityDetailForm.get('unitPriceHidden')?.value)
  

  
  if(this.productQuantityDetailForm.get('discountType')?.value == "1") 
  {
    //Calculate the percent.
    var discountAmount = (discount / 100) * actualPrice;
   
    this.productQuantityDetailForm.get('unitPrice')?.setValue(actualPrice - discountAmount);
    
  } else {
    //minus the amount from actual price.
    this.productQuantityDetailForm.get('unitPrice')?.setValue(actualPrice - discount);
 //   let afterDiscountPrice = Number(this.productQuantityDetailForm.get('unitPrice')?.value)
  //  var percentage = ((actualPrice - afterDiscountPrice ) / actualPrice) * 100; 
   // this.productQuantityDetailForm.get('discount')?.setValue(percentage);
  }

 }

 /**
  * Calculation while inserting directly amount
  */
 calculateDirectAmountDiscount() {
  var afterDiscountPrice = Number(this.productQuantityDetailForm.get('unitPrice')?.value)
  let actualPrice = Number(this.productQuantityDetailForm.get('unitPriceHidden')?.value)

  if(this.productQuantityDetailForm.get('discountType')?.value == "1") 
  {
    var percentage = ((actualPrice - afterDiscountPrice ) / actualPrice) * 100; 
    this.productQuantityDetailForm.get('discount')?.setValue(percentage);
  } else 
  {
    this.productQuantityDetailForm.get('discount')?.setValue(actualPrice - afterDiscountPrice)
  }
  
 }

}

import { ProductService } from './../product.service';
import { FormBuilder } from '@angular/forms';
import { ProductModel } from 'src/models/product';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-sale-details-dialog',
  templateUrl: './product-sale-details-dialog.component.html',
  styleUrls: ['./product-sale-details-dialog.component.css']
})
export class ProductSaleDetailsDialogComponent implements OnInit {

  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef,  
              private fb: FormBuilder,
              private productService : ProductService) { }

  productSaleDetailsForm = this.fb.group({
    automaticCalculate : true,
    id : [''],
    pph : [''],
    ppv: [null],
    zone: ['',],
    minStock: [''],
    maxStock: [''],
    expDate: [''],
    vatOnPurchase : [''],
    vatOnSales : ['']
  });

  @Input() data: ProductModel | undefined

  ngOnInit(): void {
    this.productSaleDetailsForm.get('id')?.setValue(this.data?.id);
    this.productSaleDetailsForm.get('pph')?.setValue(this.data?.pph);
    this.productSaleDetailsForm.get('ppv')?.setValue(this.data?.ppv);
    this.productSaleDetailsForm.get('minStock')?.setValue(this.data?.minStock);
    this.productSaleDetailsForm.get('maxStock')?.setValue(this.data?.maxStock);
    this.productSaleDetailsForm.get('vatOnPurchase')?.setValue(this.data?.vatOnPurchase);
    this.productSaleDetailsForm.get('vatOnSales')?.setValue(this.data?.vatOnSales);
  }

  // setProductSaleDetailsData(name : string)
  // {
  //   this.triggerEvent(name);
  //   this.bsModalRef.hide();
  // }

  

  calculatePrice(){

    // let purcahsePercentage = this.productSaleDetailsForm.get('vatOnPurchase')?.value();
    // let salesPercentage = this.productSaleDetailsForm.get('vatOnSales')?.value();

    // let pph = this.productSaleDetailsForm.get('pph')?.value();
    // let ppv =  this.productSaleDetailsForm.get('ppv')?.value();

 //  let totalpph = 
  }

  public  submitProductSaleDetails()  : boolean | undefined
  {
    this.productService.updateWithProperties(this.productSaleDetailsForm.value).subscribe((response) => {
      this.bsModalRef.hide();
      this.triggerEvent();
      return true;
    });
    return true;
  }

  triggerEvent() {
    this.event.emit({ data: "" , res:200 });
  }

}

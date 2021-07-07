import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryRef } from 'apollo-angular';
import { ProviderService } from 'src/app/common-services/provider/provider.service';
import { ProductModel } from 'src/models/product';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Pagination } from './../../../models/pagination';
import { DeliverySlipService } from '../delivery-slip.service';
import { ProviderModel } from 'src/models/Provider';
import { ProviderDialogComponent } from 'src/app/common-services/provider-dialog/provider-dialog.component';
import { PurchaseOrderService } from 'src/app/purchase-order/purchase-order.service';
import Swal from "sweetalert2";
import {SAVE_MESSAGE} from '../../common/constants/constants.service';
import { ManagerService } from 'src/app/common-services/manager/manager.service';
import { Select } from 'src/models/select';
import { Validators } from '@angular/forms';
// import { DeliveryModel } from 'src/models/delivery';
import { ManagerModel } from 'src/models/manager';
@Component({
  selector: 'app-delivery-slip-detail',
  templateUrl: './delivery-slip-detail.component.html',
  styleUrls: ['./delivery-slip-detail.component.css']
})
@UntilDestroy()
export class DeliverySlipDetailComponent implements OnInit {

  
  //This variable is for productList
  productList: any;
  //This variable is for providerList
  providerList: any;
  providerQuery: QueryRef<any> | undefined;
  quantityNo=0;
  orderProductList : any = [];
  productQuery: QueryRef<any> | undefined;


  productSearchFields : ProductModel = {
    dci : '',
    barcode : '',
    name : '',
    ppv : 0
  };

  constructor(
    private deliverySlipService: DeliverySlipService,
    private purchaseOrderService: PurchaseOrderService,
    private managerService : ManagerService,
    private providerService: ProviderService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private r: Router,

  ) { }


  managers: Select[] = [
  ];
  manager: ManagerModel | any;
  managerId: number | any;
  deliveryReference: String ='';
  ngOnInit(): void {

    /**
 * get All Product
 */
     this.getAllProduct();

         /**
     * initialize the manages
     */
    this.initManagers();
}
  /**
   * init all managers
   */
   public initManagers() {
    this.managerService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.managers = response.data.getAllManagers;
    });
  }

/**
* This function will call while paginition
* @param pageNumber 
*/
 loadLst(pageNumber: number) {
  this.querySubscription?.unsubscribe();
  this.pagination.currentPage = pageNumber;
  this.getAllProduct();
}

purchaseProduct(product : any) {

  //  let array = [];  
  //  for(let key in product){  
  //   if(product.hasOwnProperty(key)){  
  //     array.push(product[key]);  
  // }  
  // }  
  this.quantityNo+=1;
  this.orderProductList?.push(product);

  console.log("---------"+this.orderProductList);
 // console.log(array+"-------"+this.saleProductList);
}

private querySubscription: Subscription | undefined;
pagination: Pagination = {
totalPages: 2,
currentPage: 1,
totalItems: 0,
itemsPerPage: 5,
maxSize : 5
};

dataLoading: boolean = true;

/**
* get All Products
*/
getAllProduct() {
this.querySubscription?.unsubscribe();
this.dataLoading = false;   
this.productQuery = this.purchaseOrderService.getAllProducts(this.pagination.currentPage,
  this.pagination.itemsPerPage,  this.productSearchFields);

  this.querySubscription = this.productQuery.valueChanges.subscribe(response=> {
    if(response.data.getAllProducts.length > 0)
      this.pagination.totalItems = response.data.getAllProducts[0].count;
      this.dataLoading = false;
      this.productList = response.data.getAllProducts;
      this.querySubscription?.unsubscribe();
    });
}
//delivery: DeliveryModel | any;


public  submitForm()  : boolean | undefined
{
  console.log(this.managerId+'-----Manager Id-----')
  //this.manager.id = this.managerId;
  //this.delivery.manager.id = this.managerId;
  //this.delivery.provider = this.provider;
  //this.delivery.deliveryReference = this.deliveryReference;
  for(let i=0; i<this.orderProductList.length; i++) {
    this.deliverySlipService.save(this.orderProductList[i],this.managerId,this.provider,this.deliveryReference).subscribe(response => {
     this.r.navigate(['/delivery-slip'], {replaceUrl: true});
    });
  }
  Swal.fire(SAVE_MESSAGE);
  this.orderProductList = null;
  
  return true;
}


bsModalRef: BsModalRef | undefined;
providerName: string = "";
provider: ProviderModel | any;
openModalWithComponent() {
  this.bsModalRef = this.modalService.show(ProviderDialogComponent);
  this.bsModalRef.content.event.subscribe((res: { data: any; }) => {
    this.provider = res.data;
    this.providerName = this.provider.name
  });
}

/**
* This function will call while filter/search
*/
 searchProducts() {

  this.querySubscription?.unsubscribe();
  this.productQuery = this.purchaseOrderService.getAllProducts(1, 5, this.productSearchFields);

  /**
    * refetch the data
  */
  this.productQuery?.refetch();

  this.querySubscription = this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
       if(response.data.getAllProducts.length > 0)
         this.pagination.totalItems = response.data.getAllProducts[0].count;
         console.log("this.pagination.totalItems::"+this.pagination.totalItems);
         this.dataLoading = false;
         this.productList = response.data.getAllProducts;
         this.querySubscription?.unsubscribe();
       });
 }

}

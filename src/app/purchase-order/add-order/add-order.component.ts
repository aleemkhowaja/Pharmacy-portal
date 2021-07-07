import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Pagination } from './../../../models/pagination';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ProductModel } from 'src/models/product';
import { PurchaseOrderService } from '../purchase-order.service';
import { ProviderService }  from 'src/app/common-services/provider/provider.service'
import { ProviderDialogComponent } from 'src/app/common-services/provider-dialog/provider-dialog.component';
import Swal from "sweetalert2";
import {SAVE_MESSAGE} from '../../common/constants/constants.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { ProviderModel } from 'src/models/Provider';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
@UntilDestroy()
export class AddOrderComponent implements OnInit {

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
    private purchaseOrderService: PurchaseOrderService,
    private providerService: ProviderService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private r: Router,

  ) { }


  ngOnInit(): void {

        /**
     * get All Product
     */
         this.getAllProduct();
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



     
  /**
   * get All Providers
   */
  //  getAllProvider() {
  //   this.querySubscription?.unsubscribe();
  //   this.dataLoading = false;   
  //   this.providerList = this.providerService.filter(1, 5, this.productSearchFields);
  // }


/**
   * Open Customer Dialog
   */
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

 public  submitForm()  : boolean | undefined
 {
   for(let i=0; i<this.orderProductList.length; i++) {
     this.purchaseOrderService.save(this.orderProductList[i],this.provider).subscribe(response => {
      this.r.navigate(['/purchase-order'], {replaceUrl: true});
     });
   }
   Swal.fire(SAVE_MESSAGE);
   this.orderProductList = null;
   
   return true;
 }

 approvePurchase()
 {
  this.r.navigate(['/after-purchase-approve'], {replaceUrl: true});
 }


}

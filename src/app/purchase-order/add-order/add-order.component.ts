import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Pagination } from './../../../models/pagination';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Select } from './../../../models/select';
import { ProductModel } from 'src/models/product';
import { PurchaseOrderService } from '../purchase-order.service';
import { ProviderService } from 'src/app/common-services/provider/provider.service'
import { ProviderDialogComponent } from 'src/app/common-services/provider-dialog/provider-dialog.component';
import Swal from "sweetalert2";
import { SAVE_MESSAGE } from '../../common/constants/constants.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProviderModel } from 'src/models/Provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseModel } from 'src/models/purchase';
import { DciService } from 'src/app/common-services/dci/dci.service';
import { ClientModel } from 'src/models/client';
import { CustomerDialogComponent } from 'src/app/common-services/customer-dialog/customer-dialog.component';
import { ProductQuantityDetailDialogComponent } from 'src/app/common-services/dialogs/product-quantity-detail-dialog/product-quantity-detail-dialog.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
@UntilDestroy()
export class AddOrderComponent implements OnInit {

  productList: any;
  purchaseProductList: any = [];
  totalAmount: number = 0;
  isProductSubmitedEmpty: Boolean = false;

  moreInformation = true;
  searching = false;
  private querySubscription: Subscription | undefined;

  productQuery: QueryRef<any> | undefined;
  dci: Select[] = [];

  searchFields: any = {
    transactionNumber: '',
    customer: '',
    dci: '',
    nameOrBarcode: '',
    lastname: '',
    ppv: '',
    dos: '',
    createdOn: '',
    total: '',
    delivered: '',
    status: ''
  };


  productSearchFields: ProductModel = {
    dci: '',
    barcode: '',
    name: '',
    ppv: 0
  };

  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    maxSize: 5
  };


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataLoading: boolean = true;

  addEditPurchaseDto: PurchaseModel | undefined;
  addSaleForm: FormGroup = this.fb.group({
    name: [''],
    barcode: [''],
    barcode2: [''],
    categoryId: [''],
    therapeuticClass: [''],
    galenicForm: [''],
    dci: [''],
    laboratory: [''],
    range: [''],
  });

  itemsVisibility: any;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private providerService: ProviderService,
    private dciService: DciService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private r: Router,
    private router: ActivatedRoute

  ) { }

  /**
 * Open Customer Dialog
 */
  bsModalRef: BsModalRef | undefined;
  client: ClientModel | undefined;
  customerName: string | undefined;
  customerId: Number | undefined;
  openCustomerModelWithComponent() {
    this.bsModalRef = this.modalService.show(CustomerDialogComponent);
    this.bsModalRef.content.event.subscribe((res: { data: any; }) => {
      /**
       * recieved client data from dialog
       */
      this.client = res.data;
      this.customerName = this.client?.lastName;
      this.customerId = this.client?.id;
    });
  }
  
  purchase: PurchaseModel | undefined;
  openProductQuantityDetailsModelWithComponent(product: ProductModel, index: number) {

    const initialState = {
      data: product
    };
    this.bsModalRef = this.modalService.show(ProductQuantityDetailDialogComponent, {
      initialState
    });
    this.bsModalRef.content.event.subscribe((res: {
      data: any;
    }) => {
      
      /**
       * recieved sale data from dialog
       */
      this.purchase = JSON.parse(res.data);
      product.dicountAmount = Number(product.ppv) - Number(this.purchase?.unitPrice)
      if(this.purchase?.discountType == 1)
      {
        product.percentage = Number(this.purchase ?.discount);
      } else 
      {
        var actualPrice = Number(product?.ppv);
        var percentage = ((actualPrice - Number(this.purchase?.unitPrice )) / actualPrice) * 100; 
        product.percentage = percentage
      }
     
      product.ppu = Number(this.purchase?.unitPrice)
      product.isQuantityCalculatonIgonre = true;
      if(product.percentage)
      {
        product.isDiscountAvaiable = true;
      }
        

      /**
       * refresh the sale product row
       */
      this.purchaseProduct(product);
    });
  }

  ngOnInit(): void {

    /**
 * get All Product
 */
    this.getAllProduct();
    this.productQuery?.refetch();
    this.initDCI();
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



  /**
   * get All Products
   */
  getAllProduct() {
    this.querySubscription?.unsubscribe();
    this.dataLoading = false;
    this.productQuery = this.purchaseOrderService.getAllProducts(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.productSearchFields);

    this.querySubscription = this.productQuery.valueChanges.subscribe(response => {
      if (response.data.getAllProducts.length > 0)
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

    this.querySubscription = this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
      if (response.data.getAllProducts.length > 0)
        this.pagination.totalItems = response.data.getAllProducts[0].count;
      console.log("this.pagination.totalItems::" + this.pagination.totalItems);
      this.dataLoading = false;
      this.productList = response.data.getAllProducts;
      this.querySubscription?.unsubscribe();
    });
  }
  
   /**
     * init all dci
     */
  public initDCI() {
      this.dciService.filter().pipe().subscribe(response => {
      this.dci = response.data.getAllDCI;
      });
    }

  purchaseProduct(product : ProductModel) { 
            
    let recordExist : boolean = false;
    let itemCount : number = 0;
    let newSaleProductList : any = [];
    this.purchaseProductList.forEach((_element: any, index: any) => {
      product = JSON.parse(JSON.stringify(product));
      product.trDetailsVisible = false;
      
      if(!product["ppu"])
        product["ppu"] = product["ppv"];
      
      _element["trDetailsVisible"] = false;
      if(product["id"] == _element["id"]) {
        recordExist = true;
        if(!product.isQuantityCalculatonIgonre)
        {
          itemCount = _element["quantity"];
          itemCount = Number(itemCount) + 1;
          product.quantity  = itemCount;
        }
        //calculate amount 
       // this.totalAmount += Number(product["ppv"]);
        newSaleProductList?.push(product);
      } else
      {
        _element["ppu"] = _element["ppv"];
        newSaleProductList?.push(_element);
      }
    });


    if(!recordExist)
    {
      product = JSON.parse(JSON.stringify(product));
      product.quantity = 1;
      product["ppu"] = product["ppv"];
    //  product.trDetailsVisible = false;
   //   this.totalAmount+= Number(product["ppv"]);
      newSaleProductList?.push(product);
    }
    this.purchaseProductList = newSaleProductList;

    //this.calculateTotalAmountOfSale();
  }

  public submitForm(): boolean | undefined {


    return true;
  }

      /**
     * Delete purchase Product quantity 
     * @param product 
     */
       deletePurchaseProduct(product : ProductModel) {
        product = JSON.parse(JSON.stringify(product));
        let newSaleProductList : any = [];
        this.purchaseProductList.forEach((_element: any, index: any) => {
          if(product["id"] == _element["id"]) {
            if(Number(_element["quantity"]) > 1) 
            {
              _element["quantity"] = Number(_element["quantity"]) - 1;
              this.totalAmount -= Number(_element["ppv"]);
              newSaleProductList?.push(_element);
            }
            else {
              this.totalAmount -= Number(_element["ppv"]);
            }
          } else 
          {
            newSaleProductList?.push(_element);
          }
        });
        this.purchaseProductList = newSaleProductList;
      }

  approvePurchase() {
    let navigationExtras: NavigationExtras = {
      state: {
        purchaseProducts : JSON.stringify(this.purchaseProductList),
        customerId : this.customerId
      }
    };
    this.r.navigate(['/after-purchase-approve'], navigationExtras);
  }


}

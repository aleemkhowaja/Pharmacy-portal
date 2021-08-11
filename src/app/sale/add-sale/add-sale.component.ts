import { GlobalDiscountDialogComponent } from './../../common-services/dialogs/global-discount-dialog/global-discount-dialog.component';
import { ProductQuantityDetailDialogComponent } from './../../common-services/dialogs/product-quantity-detail-dialog/product-quantity-detail-dialog.component';
import { ClientModel } from './../../../models/client';
import { ProductModel } from './../../../models/product';
import { BaseComponent } from './../../common-services/base/base.component';
import { CustomerDialogComponent } from './../../common-services/customer-dialog/customer-dialog.component';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select } from './../../../models/select';
import { DciService } from './../../common-services/dci/dci.service';
import { QueryRef } from 'apollo-angular';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SaleModel } from 'src/models/sale';
import { SaleService } from '../sale.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductSaleDetailsDialogComponent } from 'src/app/product/product-sale-details-dialog/product-sale-details-dialog.component';
import {UtilityService} from '../../common/util/utility.service';


@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
@UntilDestroy()
export class AddSaleComponent extends BaseComponent implements OnInit {



  productList: any;
  saleProductList: any = [];
  totalAmount = 0;
  isProductSubmitedEmpty = false;

  moreInformation = true;
  searching = false;
  private querySubscription: Subscription | undefined;

  productQuery: QueryRef<any> | undefined;
  dci: Select[] = [];

  searchFields: any = {
    transactionNumber: '',
    customer: '',
    dci : '',
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
    dci : '',
    barcode : '',
    name : '',
    ppv : 0
  };

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataLoading = true;


  addEditSaleDto: SaleModel | undefined;
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

  /**
   * Open Customer Dialog
   */
  bsModalRef: BsModalRef | undefined;
  client: ClientModel | undefined;
  customerName: string | undefined;
  customerId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private saleService: SaleService,
    private cdr: ChangeDetectorRef,
    private dciService: DciService,
    private modalService: BsModalService,
    private r: Router,
    public utilityService: UtilityService
  ) {
    super();

    /**
     * get saled if approve sale without any product
     */
    this.isProductSubmitedEmpty = this.r.getCurrentNavigation()?.extras.state?.isProductSubmitedEmpty;
  }


  ngOnInit(): void {

    const _saleId: number = this.router.snapshot.params.id;
    this.addEditSaleDto = this.saleService.getSpecificProduct(_saleId);
    if (this.addEditSaleDto) {
      this.addSaleForm.patchValue(this.addEditSaleDto);
    }

    /**
     * get All Product
     */
    this.getAllProduct();

    /**
     * refetch the data
     */
    this.productQuery?.refetch();


    /**
     * get all dci
     */
    this.initDCI();
  }

  /**
   * in sale screen when adding discount by percentage or by amount from
   * sale products
   */
  sale: SaleModel | undefined;
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
      this.sale = JSON.parse(res.data);
      product.dicountAmount = Number(product.ppv) - Number(this.sale?.unitPrice);
      if (this.sale?.discountType == 1)
      {
        product.percentage = Number(this.sale ?.discount);
      } else
      {
        const actualPrice = Number(product?.ppv);
        const percentage = ((actualPrice - Number(this.sale?.unitPrice )) / actualPrice) * 100;
        product.percentage = percentage;
      }

      product.ppu = Number(this.sale?.unitPrice);
      product.isQuantityCalculatonIgonre = true;
      if (product.percentage)
      {
        product.isDiscountAvaiable = true;
      }


      /**
       * refresh the sale product row
       */
      this.purchaseProduct(product);
    });
  }


  /**
   * Open Global Discount Dialog
   */
  openGlobalDiscountDialog() {

    const initialState = {
     // data: product
    };
    this.bsModalRef = this.modalService.show(GlobalDiscountDialogComponent, {
      initialState
    });

    this.bsModalRef.content.event.subscribe((res: {
      data: any;
    }) => {
      /**
       * recieved sale data from dialog
       */
       let saleTemp = { } as SaleModel;
       saleTemp = JSON.parse(res.data);
       this.applyGlobalDiscount(saleTemp);

    });

  }

  /**
   * Apply Global Discount
   * @param sale
   */
  applyGlobalDiscount(saleModel: SaleModel)
  {

    this.saleProductList.forEach((_element: any, index: any) => {
      const actualPrice = Number(this.saleProductList[index].ppv);
      if (saleModel?.discountType == 2)
      {
        const percentage = ((actualPrice - (actualPrice - Number(saleModel?.discount))) / actualPrice) * 100;
        this.saleProductList[index].percentage = Number(percentage);
        this.saleProductList[index].dicountAmount = Number(saleModel?.discount);
        this.saleProductList[index].ppu = actualPrice - Number(saleModel?.discount);

      } else
      {
        const discountAmount = (Number(saleModel?.discount) / 100) * _element.ppu;
        this.saleProductList[index].percentage = Number(saleModel?.discount);
        this.saleProductList[index].dicountAmount = discountAmount;
        this.saleProductList[index].ppu  = actualPrice - discountAmount;
      }

      this.saleProductList[index].isDiscountAvaiable = true;

    });

    /**
     * Re Calculate Ammount after global Discount
     */
    this.calculateTotalAmountOfSale();
  }

  /**
   *
   * @param product when edit button called from product table
   * it will show the dialog
   */
  openProductdSaleDetailsModelWithComponent(product: ProductModel) {

    const initialState = {
      data: product
    };

    this.bsModalRef = this.modalService.show(ProductSaleDetailsDialogComponent, {initialState});
    this.bsModalRef.content.event.subscribe((res: { data: any; }) => {
    /**
     * TODO REPLACE
     * WE NEED GET PRODUT LIST
     */
    window.location.reload();
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() { }

  submitForm() {
    this.saleService.save(this.addSaleForm.value);
  }


  /**
   * get All Products
   */
  getAllProduct() {
    this.dataLoading = false;
    this.productQuery = this.saleService.getAllProducts(this.utilityService.pagination.currentPage,
      this.utilityService.pagination.itemsPerPage,  this.productSearchFields);

    this.querySubscription = this.productQuery.valueChanges.subscribe(response => {
        if (response.data.getAllProducts.length > 0) {
          this.utilityService.pagination.totalItems = response.data.getAllProducts[0].count;
        }
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
      this.productQuery = this.saleService.getAllProducts(1, 5, this.productSearchFields);

      /**
        * refetch the data
      */
      this.productQuery?.refetch();

      this.querySubscription = this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
           if (response.data.getAllProducts.length > 0) {
             this.utilityService.pagination.totalItems = response.data.getAllProducts[0].count;
           }
           this.dataLoading = false;
           this.productList = response.data.getAllProducts;
           this.querySubscription?.unsubscribe();
           });
     }

     ngOnDestroy() {
      this.querySubscription?.unsubscribe();
    }


    /**
     * init all dci
     */
    public initDCI() {
      this.dciService.filter().pipe().subscribe(response => {
      this.dci = response.data.getAllDCI;
      });
    }

    /**
    * This function will call while paginition
    * @param pageNumber
    */
     loadLst(pageNumber: number) {
      this.querySubscription?.unsubscribe();
      this.utilityService.pagination.currentPage = pageNumber;
      this.getAllProduct();
    }

    /**
     *
     * This function will be called when we click the product table
     * and click the product which we want to purchase
     * @param product
     */
    purchaseProduct(product: ProductModel) {

      let recordExist = false;
      let itemCount = 0;
      const newSaleProductList: any = [];
      this.saleProductList.forEach((_element: any, index: any) => {
        product = JSON.parse(JSON.stringify(product));
        product.trDetailsVisible = false;

        if (!product.ppu) {
          product.ppu = product.ppv;
        }

        _element.trDetailsVisible = false;
        if (product.id == _element.id) {
          recordExist = true;
          if (!product.isQuantityCalculatonIgonre)
          {
            itemCount = _element.quantity;
            itemCount = Number(itemCount) + 1;
            product.quantity  = itemCount;
          }
          // calculate amount
         // this.totalAmount += Number(product["ppv"]);
          newSaleProductList?.push(product);
        } else
        {
          _element.ppu = _element.ppv;
          newSaleProductList?.push(_element);
        }
      });


      if (!recordExist)
      {
        product = JSON.parse(JSON.stringify(product));
        product.quantity = 1;
        product.ppu = product.ppv;
      //  product.trDetailsVisible = false;
     //   this.totalAmount+= Number(product["ppv"]);
        newSaleProductList?.push(product);
      }
      this.saleProductList = newSaleProductList;

      this.calculateTotalAmountOfSale();
    }


    /**
     * Calculate the totalAmount
     */
    calculateTotalAmountOfSale() {
      this.totalAmount = 0;
      this.saleProductList.forEach((_element: any, index: any) => {
        this.totalAmount += (Number(_element.quantity) * Number(_element.ppu));
      });

    }

    showHide(product: ProductModel) {
      product.trDetailsVisible =  product.trDetailsVisible ? false : true;
    }


    /**
     * Delete Sale Product quantity
     * @param product
     */
    deleteSaleProduct(product: ProductModel) {
      product = JSON.parse(JSON.stringify(product));
      const newSaleProductList: any = [];
      this.saleProductList.forEach((_element: any, index: any) => {
        if (product.id == _element.id) {
          if (Number(_element.quantity) > 1)
          {
            _element.quantity = Number(_element.quantity) - 1;
            newSaleProductList?.push(_element);
          }
        } else
        {
          newSaleProductList?.push(_element);
        }
      });
      this.saleProductList = newSaleProductList;

      this.calculateTotalAmountOfSale();
    }

    approveSales()
    {
      const navigationExtras: NavigationExtras = {
        state: {
          saleProducts : JSON.stringify(this.saleProductList),
          customerId : this.customerId
        }
      };
      this.r.navigate(['/after-approve-sale', ], navigationExtras);
    }

    editSaleitem(item: ProductModel)
    {

    }


}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProductModel } from 'src/models/product';
import { StrNgCombo } from 'src/models/strNgCombo';
import { QuoteService } from '../quote.service';
import {QueryRef} from 'apollo-angular';
import {SaleService} from '../../sale.service';
import {UtilityService} from '../../../common/util/utility.service';
import {Subscription} from 'rxjs';
import {ProductSaleDetailsDialogComponent} from '../../../product/product-sale-details-dialog/product-sale-details-dialog.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ClientModel} from '../../../../models/client';
import {SaleModel} from '../../../../models/sale';
import {CustomerDialogComponent} from '../../../common-services/customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  addEditProductDto: ProductModel | undefined;
  addQuoteForm: FormGroup = this.fb.group({
    name: [''],
    barcode: [''],
    barcode2: [''],
    categoryId: [''],
    therapeuticClass: [''],
    galenicForm: [''],
    dci: [''],
    laboratory: [''],
    range: [''],
    subRange: [''],
    productTable: [''],
    prescriptionRequired: [false],
    marketProduct: [false],
    pph: [''],
    ppv: [''],
    vatOnPurchase: [''],
    vatOnSales: [''],
    isRefundable: [''],
    reimbursementBasis: [''],
    presentation: [''],
    excipients: [''],
    dosageForAdults: [''],
    indications: [''],
    drivingContraindications: [''],
    breastFeedingContraindications: [''],
    pregnancyContraindications: [''],
    productLabReference: [''],
    packaging: [''],
    monograph: [''],
    description: ['']
  });


  saleProductList: any = [];
  totalAmount = 0;
  isProductSubmitedEmpty = false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataLoading = true;
  productQuery: QueryRef<any> | undefined;
  productSearchFields: ProductModel = {
    dci : '',
    barcode : '',
    name : '',
    ppv : 0
  };
  productList: any;
  private querySubscription: Subscription | undefined;
  /**
   * Open Customer Dialog
   */
  bsModalRef: BsModalRef | undefined;
  client: ClientModel | undefined;
  customerName: string | undefined;
  customerId: number | undefined;

  categories: StrNgCombo[] = [
    { label: 'category1', value: '1' },
    { label: 'category2', value: '2' },
    { label: 'category3', value: '3' },
  ];
  therapeuticClasses: StrNgCombo[] = [
    { label: 'class1', value: '1' },
    { label: 'class2', value: '2' },
    { label: 'class3', value: '3' },
  ];
  galenicForms: StrNgCombo[] = [
    { label: 'galenic form 1', value: '1' },
    { label: 'galenic form 2', value: '2' },
    { label: 'galenicForm 3', value: '3' },
  ];
  dcis: StrNgCombo[] = [
    { label: 'dci 1', value: '1' },
    { label: 'dci 2', value: '2' },
    { label: 'dci 3', value: '3' },
  ];
  ranges: StrNgCombo[] = [
    { label: 'range 1', value: '1' },
    { label: 'range 2', value: '2' },
    { label: 'range 3', value: '3' },
  ];
  subRanges: StrNgCombo[] = [
    { label: 'sub range 1', value: '1' },
    { label: 'sub range 2', value: '2' },
    { label: 'sub range 3', value: '3' },
  ];
  productTables: StrNgCombo[] = [
    { label: 'product table 1', value: '1' },
    { label: 'product table 2', value: '2' },
    { label: 'product table 3', value: '3' },
  ];
  vats: StrNgCombo[] = [
    { label: 'vat 1', value: '1' },
    { label: 'vat 2', value: '2' },
    { label: 'vat 3', value: '3' },
  ];
  refundables: StrNgCombo[] = [
    { label: 'ref 1', value: '1' },
    { label: 'ref 2', value: '2' },
    { label: 'ref 3', value: '3' },
  ];
  contraindications: StrNgCombo[] = [
    { label: 'contraindication 1', value: '1' },
    { label: 'contraindication 2', value: '2' },
    { label: 'contraindication 3', value: '3' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
    private saleService: SaleService,
    public utilityService: UtilityService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {

    // const _productId: number = this.router.snapshot.params.id;
    // console.log(_productId);
    // this.addEditProductDto = this.quoteService.getSpecificProduct(_productId);
    // if(this.addEditProductDto)
    //   this.addQuoteForm.patchValue(this.addEditProductDto);
    // console.log(this.addEditProductDto);

    // const quoteId: number = this.router.snapshot.params.id;
    // this.addEditSaleDto = this.saleService.getSpecificProduct(quoteId);
    // if (this.addEditSaleDto) {
    //   this.addSaleForm.patchValue(this.addEditSaleDto);
    // }

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
   // this.initDCI();

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
      if (product.id === _element.id) {
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

  ngAfterViewInit() {}

  submitForm() {
    this.quoteService.save(this.addQuoteForm.value);

    console.log(this.addQuoteForm.value);
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

  sale: SaleModel | undefined;
  openCustomerModelWithComponent(): void {
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

}

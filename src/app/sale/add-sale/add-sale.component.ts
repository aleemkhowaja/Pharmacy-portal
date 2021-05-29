import { CustomerDialogComponent } from './../../common-services/customer-dialog/customer-dialog.component';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductModel } from 'src/models/product';
import { Select } from './../../../models/select';
import { DciService } from './../../common-services/dci/dci.service';
import { Pagination } from './../../../models/pagination';
import { QueryRef } from 'apollo-angular';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { SaleModel } from 'src/models/sale';
import { StrNgCombo } from 'src/models/strNgCombo';
import { SaleService } from '../sale.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
@UntilDestroy()
export class AddSaleComponent implements OnInit {

  productList: any;
  saleProductList : any = [];

  moreInformation = true;
  searching = false;
  private querySubscription: Subscription | undefined;

  productQuery: QueryRef<any> | undefined;
  dci: Select[] = [];

  searchFields: any = {
    transactionNumber: '',
    customer: '',
    dci : '',
    nameOrBarcode:'',
    lastname:'',
    ppv:'',
    dos: '',
    createdOn: '',
    total: '',
    delivered: '',
    status: ''
  };

  productSearchFields : ProductModel = {
    dci : '',
    barcode : '',
    name : '',
    ppv : 0
  };

  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    maxSize : 5
  };


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataLoading: boolean = true;


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

  
  
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private saleService: SaleService,
    private cdr: ChangeDetectorRef,
    private dciService : DciService,
    private modalService: BsModalService
  ) { } 

  /**
   * Open Customer Dialog
   */
  bsModalRef: BsModalRef | undefined;
  customerName: string = "";
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(CustomerDialogComponent);
    this.bsModalRef.content.event.subscribe((res: { data: any; }) => {
      this.customerName = res.data;
    });
    
  }

  // openModalWithComponent() {
  //   console.log("----------------");

  //   this.bsModalRef = this.modalService.show(CustomerDialogComponent);
  //   this.bsModalRef.content.closeBtnName = 'Close'; 
  //   this.bsModalRef.content.event.subscribe((res: any) => {
  //    console.log(res);
  //   });

  // }

  ngOnInit(): void {

    const _saleId: number = this.router.snapshot.params.id;
    console.log("====="+_saleId);
    this.addEditSaleDto = this.saleService.getSpecificProduct(_saleId);
    if (this.addEditSaleDto)
      this.addSaleForm.patchValue(this.addEditSaleDto);
    console.log(this.addEditSaleDto);


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
    this.querySubscription?.unsubscribe();
    this.dataLoading = false;   
    this.productQuery = this.saleService.getAllProducts(this.pagination.currentPage,
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
      this.productQuery = this.saleService.getAllProducts(1, 5, this.productSearchFields);

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

     ngOnDestroy() {
      console.log("destroy -----");
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
      this.pagination.currentPage = pageNumber;
      this.getAllProduct();
    }

    purchaseProduct(product : any) {

      // let array = [];  
      // for(let key in product){  
      //  if(product.hasOwnProperty(key)){  
      //    array.push(product[key]);  
      //  }  
      // }  

      this.saleProductList?.push(product);

      console.log(this.saleProductList);
     // console.log(array+"-------"+this.saleProductList);
    }
}

import { Subscription } from 'rxjs';
import { CustomerDialogComponent } from './../../common-services/customer-dialog/customer-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryRef } from 'apollo-angular';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Pagination } from './../../../models/pagination';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleService } from '../sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.component.html',
  styleUrls: ['./search-sale.component.css']
})
@UntilDestroy()
export class SearchSaleComponent implements OnInit {

  saleQuery: QueryRef<any> | undefined;

  lstSale: any;
  moreInformation = true;
  searching = false;
  productQuery: QueryRef<any> | undefined;
  getAllSubscription: Subscription | undefined;
  searchSubscription: Subscription | undefined;

  searchFields: any = {
    transactionNumber: '',
    customerName: '',
    dos: '',
    createdOn: '',
    amount: null,
    delivered: '',
    status: ''
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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataLoading: boolean = true;

  constructor(private saleService: SaleService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    /**
     * get All Sales
     */
     this.getAll();

    /**
      * refetch the data
    */
    this.saleQuery?.refetch();
  }

  getAllProducts() {
    this.dataLoading = false;   
    this.productQuery = this.saleService.getAllProducts(this.pagination.currentPage,
      this.pagination.itemsPerPage,  this.searchFields);

     this.productQuery.valueChanges.pipe().subscribe(response=> {
        if(response.data.getAllCustomers.length > 0)
          this.pagination.totalItems = response.data.getAllCustomers[0].count;
          this.dataLoading = false;
          this.lstSale = response.data.getAllCustomers;
        });
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  viewSale(id: number) {
    this.router.navigate([`/sale/${id}`]);
  }

    /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
     getAll() {
      this.getAllSubscription?.unsubscribe();
      this.searchSubscription?.unsubscribe();
      this.saleQuery = this.saleService.filter(this.pagination.currentPage,
        this.pagination.itemsPerPage,  this.searchFields);
  
        this.getAllSubscription  = this.saleQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
          if(response.data.getAllTransaction.length > 0)
            this.pagination.totalItems = response.data.getAllTransaction[0].count;
            this.dataLoading = false;
            this.lstSale = response.data.getAllTransaction;
          });
    }


  /**
   * This function will call while filter/search
   */
  searchItems() {

    this.getAllSubscription?.unsubscribe();
     this.searchSubscription?.unsubscribe();
 
     //this.searchFields.type?.id = this.searchFields.typeId;
     if(this.searchFields?.amount == ""){
      this.searchFields.amount = null;
    }
     this.saleQuery = this.saleService.filter(1, 5, this.searchFields);
 
     this.searchSubscription = this.saleQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
         if(response.data.getAllTransaction.length > 0)
           this.pagination.totalItems = response.data.getAllTransaction[0].count;
           this.dataLoading = false;
           this.lstSale = response.data.getAllTransaction;
         });
   }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {PurchaseOrderService} from '../purchase-order.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { QueryRef } from 'apollo-angular';
import { Pagination } from './../../../models/pagination';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
@UntilDestroy()
export class SearchOrderComponent implements OnInit {
  
  purchaseQuery: QueryRef<any> | undefined;
  listPurchases: any;

  moreInformation = true;
  searching = false;
  productQuery: QueryRef<any> | undefined;
  getAllPurchaseSubscription: Subscription | undefined;
  searchPurchaseSubscription: Subscription | undefined;

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
  constructor(private purchaseService: PurchaseOrderService) { }

  ngOnInit(): void {
    this.getAll();
    this.purchaseQuery?.refetch();
  }
   
  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }
   /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
     getAll() {
      this.getAllPurchaseSubscription?.unsubscribe();
      this.searchPurchaseSubscription?.unsubscribe();
      this.purchaseQuery = this.purchaseService.filter(this.pagination.currentPage,
        this.pagination.itemsPerPage,  this.searchFields);
  
        this.getAllPurchaseSubscription  = this.purchaseQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
          if(response.data.getAllTransaction.length > 0)
            this.pagination.totalItems = response.data.getAllTransaction[0].count;
            this.dataLoading = false;
            this.listPurchases = response.data.getAllTransaction;
          });
    }

    searchItems() {
      this.getAllPurchaseSubscription?.unsubscribe();
     this.searchPurchaseSubscription?.unsubscribe();
 
     //this.searchFields.type?.id = this.searchFields.typeId;
     if(this.searchFields?.amount == ""){
      this.searchFields.amount = null;
    }
     this.purchaseQuery = this.purchaseService.filter(1, 5, this.searchFields);
 
     this.searchPurchaseSubscription = this.purchaseQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
         if(response.data.getAllTransaction.length > 0)
           this.pagination.totalItems = response.data.getAllTransaction[0].count;
           this.dataLoading = false;
           this.listPurchases = response.data.getAllTransaction;
         });
    }
}

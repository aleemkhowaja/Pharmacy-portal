import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Pagination } from './../../../../models/pagination';
import { Component, OnInit, ViewChild } from '@angular/core';
import {untilDestroyed} from '@ngneat/until-destroy';
import {QueryRef} from 'apollo-angular';
import {Subscription} from 'rxjs';
import {SaleService} from '../../sale.service';

@Component({
  selector: 'app-search-quote',
  templateUrl: './search-quote.component.html',
  styleUrls: ['./search-quote.component.css']
})
export class SearchQuoteComponent implements OnInit {

  saleQuery: QueryRef<any> | undefined;
  moreInformation = true;
  searching = false;
  productQuery: QueryRef<any> | undefined;
  getAllSubscription: Subscription | undefined;
  searchSubscription: Subscription | undefined;
  lstSale: any;
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
  searchFields: any = {
    transactionNumber: '',
    customerName: '',
    date: '',
    amount: null,
    status: '',
    isQuote: false
  };
  dataLoading = true;

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    /**
     * get All Sales
     */
    this.getAll();
  }

  /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
  getAll() {
    this.getAllSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.searchFields.isQuote = true;
    this.saleQuery = this.saleService.filter(this.pagination.currentPage,
      this.pagination.itemsPerPage,  this.searchFields);

    this.getAllSubscription  = this.saleQuery.valueChanges.subscribe(response => {
      if(response.data.getAllTransaction.length > 0) {
        this.pagination.totalItems = response.data.getAllTransaction[0].count;
      }
      this.dataLoading = false;
      this.lstSale = response.data.getAllTransaction;
    });
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }


}

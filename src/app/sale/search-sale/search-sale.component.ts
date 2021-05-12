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
export class SearchSaleComponent implements OnInit {

  lstSale: any;
  moreInformation = true;
  searching = false;
  searchFields: any = {
    transactionNumber: '',
    customer: '',
    dos: '',
    createdOn: '',
    total: '',
    delivered: '',
    status: ''
  };
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
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
    private router: Router) { }

  ngOnInit(): void {
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstSale = this.saleService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.lstSale ', this.lstSale);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  viewSale(id: number) {
    this.router.navigate([`/sale/${id}`]);
  }

  searchItems() {
    this.lstSale = this.saleService.search(this.searchFields);
    console.log(this.lstSale);
  }

}

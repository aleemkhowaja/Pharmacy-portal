import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Pagination } from './../../../models/pagination';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.component.html',
  styleUrls: ['./search-sale.component.css']
})
export class SearchSaleComponent implements OnInit {

  lstSale: any;
  moreInformation = true;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
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




  constructor() { }

  ngOnInit(): void {
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data

    //#endregion

    console.log('this.lstSale ', this.lstSale);
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {
  lstStock: any;
  moreInformation = false;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
  };

  searching = false;
  searchFields: any = {
    name: '',
    ppv: '',
    category: '',
    pharmaceuticalForm: '',
    pph: '',
    barCode: '',
    zone: '',
    active: ''
  };

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataLoading: boolean = true;

  constructor(private stockService: StockService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstStock = this.stockService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.allStock ', this.lstStock);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  toogleMoreInformation() {
    this.moreInformation = !this.moreInformation;
  }

  viewStock(id: number) {
    this.router.navigate([`/stock/${id}`]);
  }

  searchItems() {
    this.lstStock = this.stockService.search(this.searchFields);
    console.log(this.lstStock);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-search-product-suggestion',
  templateUrl: './search-product-suggestion.component.html',
  styleUrls: ['./search-product-suggestion.component.css']
})
export class SearchProductSuggestionComponent implements OnInit {
  lstProduct: any;
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

  constructor(private productService: ProductService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstProduct = this.productService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.allProduct ', this.lstProduct);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  viewProduct(id: number) {
    this.router.navigate([`/product/${id}`]);
  }

  searchItems() {
    this.lstProduct = this.productService.search(this.searchFields);
    console.log(this.lstProduct);
  }
}

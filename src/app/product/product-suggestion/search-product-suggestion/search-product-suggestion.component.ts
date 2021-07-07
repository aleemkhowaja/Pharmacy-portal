import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { ProductSuggestionService } from '../product-suggestion.service';
import { QueryRef } from 'apollo-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { ProductSuggestionModel } from 'src/models/productSuggestionModel';

@Component({
  selector: 'app-search-product-suggestion',
  templateUrl: './search-product-suggestion.component.html',
  styleUrls: ['./search-product-suggestion.component.css']
})
@UntilDestroy()
export class SearchProductSuggestionComponent implements OnInit {
  productSuggestionQuery: QueryRef<any> | undefined;
  getAllProductSuggestionSubscription: Subscription | undefined;
  searchProductSuggestionSubscription: Subscription | undefined; 
  
  lstProductSuggestion: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
    maxSize : 5
  };
  searching = false;
  searchFields: ProductSuggestionModel = {
    lastName: '',
    ppv: 0,
    categoryId: 0,
    pharmaceuticalId:0,
    pph: 0,
    barcode: '',
    zonee: '',
    activee: ''
  };
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataLoading: boolean = true;

  constructor(private productSuggestionService: ProductSuggestionService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAll();
    this.productSuggestionQuery?.refetch();
  }

  getAll() {

    this.productSuggestionQuery = this.productSuggestionService.filter(this.pagination.currentPage,
    this.pagination.itemsPerPage,  this.searchFields);

      this.productSuggestionQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
        if(response.data.getAllProductSuggestions.length > 0)
          this.pagination.totalItems = response.data.getAllProductSuggestions[0].count;
          this.dataLoading = false;
          this.lstProductSuggestion = response.data.getAllProductSuggestions;
        });

    console.log('this.allProduct ', this.lstProductSuggestion);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  viewProductSuggestion(id: number) {
    this.router.navigate([`/product-suggestion/${id}`]);
  }

  searchItems() {

    this.getAllProductSuggestionSubscription?.unsubscribe();
    this.searchProductSuggestionSubscription?.unsubscribe();
 
     //this.searchFields.type?.id = this.searchFields.typeId;
 
     this.productSuggestionQuery = this.productSuggestionService.filter(1, 5, this.searchFields);
 
     this.searchProductSuggestionSubscription = this.productSuggestionQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
         if(response.data.getAllProductSuggestions.length > 0)
           this.pagination.totalItems = response.data.getAllProductSuggestions[0].count;
           this.dataLoading = false;
           this.lstProductSuggestion = response.data.getAllProductSuggestions;
           this.productSuggestionQuery?.refetch();
         });
   }
 
}

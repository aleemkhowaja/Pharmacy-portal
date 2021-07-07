import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { ProductService } from '../product.service';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
@UntilDestroy()
export class SearchProductComponent implements OnInit {
  productQuery: QueryRef<any> | undefined;
  getAllProductSubscription: Subscription | undefined;
  searchProductSubscription: Subscription | undefined; 

  lstProduct: any;
  moreInformation = false;
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

  constructor(private productService: ProductService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAll();

    /**
     * refetch the data
     */
     this.productQuery?.refetch();
  }

  getAll() {

    this.productQuery = this.productService.filter(this.pagination.currentPage,
    this.pagination.itemsPerPage,  this.searchFields);

      this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
        if(response.data.getAllProducts.length > 0)
          this.pagination.totalItems = response.data.getAllProducts[0].count;
          this.dataLoading = false;
          this.lstProduct = response.data.getAllProducts;
        });

    console.log('this.allProduct ', this.lstProduct);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  toogleMoreInformation() {
    this.moreInformation = !this.moreInformation;
  }

  viewProduct(id: number) {
    this.router.navigate([`/product/${id}`]);
  }

  searchItems() {

    this.getAllProductSubscription?.unsubscribe();
    this.searchProductSubscription?.unsubscribe();
 
     //this.searchFields.type?.id = this.searchFields.typeId;
 
     this.productQuery = this.productService.filter(1, 5, this.searchFields);
 
     this.searchProductSubscription = this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
         if(response.data.getAllProducts.length > 0)
           this.pagination.totalItems = response.data.getAllProducts[0].count;
           this.dataLoading = false;
           this.lstProduct = response.data.getAllProducts;
           this.productQuery?.refetch();
         });
   }

}

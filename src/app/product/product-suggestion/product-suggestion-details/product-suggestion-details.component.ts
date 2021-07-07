import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryRef } from 'apollo-angular';
import { CategoryModel } from 'src/models/category';
import { PharmaceuticalFormModel } from 'src/models/pharmaceuticalFormModel';
import { ProductSuggestionModel } from 'src/models/productSuggestionModel';
import { ProductSuggestionService } from '../product-suggestion.service';

@Component({
  selector: 'app-product-suggestion-details',
  templateUrl: './product-suggestion-details.component.html',
  styleUrls: ['./product-suggestion-details.component.css']
})
@UntilDestroy()
export class ProductSuggestionDetailsComponent implements OnInit {

  productSuggestionQuery: QueryRef<any> | undefined;
  productSuggestion: ProductSuggestionModel | undefined;
  lstProductSuggestion: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
    maxSize: 5
  };

  searching = false;
  catgry!: CategoryModel;
  pharmaceuticalForm!: PharmaceuticalFormModel;
  searchFields: ProductSuggestionModel = {
    lastName: '',
    ppv: 0,
    category: this.catgry,
    pharmaceuticalForm: this.pharmaceuticalForm,
    pph: 0,
    barcode: ''
  };
  dataLoading: boolean = true;
  //product-suggestion
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSuggestionService: ProductSuggestionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
          const id = +params['id'];
          this.getById(id);
          this.productSuggestionQuery ?.refetch();
      }
    );
  }

  viewProductSuggestion(id: number) {
    this.router.navigate([`/product-suggestion/${id}`]);
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
  }

    /**
   * get Product-suggestion/product-suggestion by id
   * @param _productId 
   */
     getById(_productId: number) {
      console.log("==="+_productId);
      this.productSuggestionQuery = this.productSuggestionService.getById(_productId);
  
      this.productSuggestionQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
        this.productSuggestion = response.data.ProductSuggestionById;
      });
  
      this.getAll();
    }
  
    loadLst(pageNumber: number) {
      this.pagination.currentPage = pageNumber;
      this.getAll();
    }
}

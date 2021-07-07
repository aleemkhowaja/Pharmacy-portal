import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { ProductModel } from 'src/models/product';
import { ProductService } from '../product.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryRef } from 'apollo-angular';
import { CategoryModel } from 'src/models/category';
import { PharmaceuticalFormModel } from 'src/models/pharmaceuticalFormModel';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
@UntilDestroy()
export class ProductDetailsComponent implements OnInit {
  productQuery : QueryRef < any > | undefined;
  product: ProductModel | undefined;
  lstProduct: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
    maxSize : 5
  };

  searching = false;
  catgry!: CategoryModel;
  pharmaceuticalForm!:PharmaceuticalFormModel;
  searchFields: ProductModel = {
    name: '',
    ppv: 0,
    categoryModel: this.catgry,
    pharmaceuticalFormModel: this.pharmaceuticalForm,
    pph: 0,
    barcode: ''
  };
  dataLoading: boolean = true;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService
              ) {

            }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
          const id = +params['id'];
          this.getById(id);
          this.productQuery ?.refetch();
      }
    );
  }

  viewProduct(id: number) {
    this.router.navigate([`/product/${id}`]);
  }


  getAll() {
    this.productQuery = this.productService.filter(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.searchFields);

    this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
      if (response.data.getAllProducts.length > 0)
        this.pagination.totalItems = response.data.getAllProducts[0].count;
      this.dataLoading = false;
      this.lstProduct = response.data.getAllProducts;
    });
  }
  

  /**
   * get Product/product by id
   * @param _productId 
   */
   getById(_productId: number) {
    console.log("==="+_productId);
    this.productQuery = this.productService.getById(_productId);

    this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
      this.product = response.data.ProductById;
    });

    this.getAll();
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

}

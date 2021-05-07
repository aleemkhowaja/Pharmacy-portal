import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { ProductModel } from 'src/models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel | undefined;
  lstProduct: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
  };
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService
              ) {

            }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
          const id = +params['id'];
          this.getProduct(id);
      }
    );
  }

  viewProduct(id: number) {
    this.router.navigate([`/product/${id}`]);
  }

  getProduct(_productId: number) {
    this.product = undefined;
    this.product = this.productService.getSpecificProduct(_productId);
    this.getAll();
  }

  getAll() {
    //#region Dummy Data
    this.lstProduct = this.productService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

}

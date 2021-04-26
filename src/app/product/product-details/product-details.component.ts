import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel | undefined;

  constructor(private router: ActivatedRoute,
              private productService: ProductService
              ) { }

  ngOnInit(): void {
    const _productId: number = this.router.snapshot.params.id;
    this.product = this.productService.getSpecificProduct(_productId);
  }

}

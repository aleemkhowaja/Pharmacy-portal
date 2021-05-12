import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { SaleModel } from 'src/models/sale';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {
  sale: SaleModel | undefined;
  lstSale: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
  };
  constructor(private route: ActivatedRoute,
    private router: Router,
    private saleService: SaleService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getSale(id);
      }
    );
  }

  viewSale(id: number) {
    this.router.navigate([`/sale/${id}`]);
  }

  getSale(_saleId: number) {
    this.sale = undefined;
    this.sale = this.saleService.getSpecificProduct(_saleId);
    this.getAll();
  }

  getAll() {
    this.lstSale = this.saleService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

}

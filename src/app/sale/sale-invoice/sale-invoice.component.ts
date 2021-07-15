import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/models/pagination';
import { SaleModel } from 'src/models/sale';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.css']
})
@UntilDestroy()
export class SaleInvoiceComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private saleService: SaleService) {
    this.getAll();
  }


  addEditSaleDto: SaleModel | undefined;
  transactionQuery: QueryRef < any > | undefined;
  getAllSubscription: Subscription | undefined;
  searchSubscription: Subscription | undefined;
  saleQuery: QueryRef < any > | undefined;
  lstSale: any;
  lstSaleProducts: any;

  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    maxSize: 2
  };
  dataLoading = true;
  searchFields: any = {
    id: 0,
    customerName: '',
    dos: '',
    createdOn: '',
    amount: null,
    delivered: '',
    status: ''
  };

  totalAmountWithoutDiscount= 0.0;
  totalDiscount = 0.0;
  totalAmountAfterDiscount = 0.0;
  htTotalAmount = 0.0;
  vatAmount = 0.0;

  ngOnInit(): void {

    const transactionId: number = this.route.snapshot.params.id;
    if (transactionId > 0) {
      this.getById(transactionId);
     // this.transactionQuery ?.refetch();
    }
  }


  /**
   * get transaction by id
   * @param transactionId
   */
  getById(transactionId: number) {
    this.lstSaleProducts = null;
    this.transactionQuery = this.saleService.getById(transactionId);
    this.transactionQuery.valueChanges.subscribe(response => {
      this.addEditSaleDto = response.data.transactionById;
      this.lstSaleProducts = this.addEditSaleDto?.transactionDetails;
      this.calculateInvoiceDetails();
    });


  }

  calculateInvoiceDetails()
  {
    this.lstSaleProducts.forEach((_element: any, index: any) => {
      const  totalOriginalPrice = Number(_element.product.ppv) * Number(_element.quantity);
      const  totalAfterDiscount = Number(_element.amountAfterDiscount) * Number(_element.quantity);
      this.totalAmountWithoutDiscount += totalOriginalPrice;
      this.totalAmountAfterDiscount += totalAfterDiscount;
      const  vatPer =  (1 + (Number(_element.product?.vatOnSale) / 100));
      const htCalculate = totalOriginalPrice / vatPer;
      this.htTotalAmount += htCalculate;
    });
    this.totalDiscount = this.totalAmountWithoutDiscount - this.totalAmountAfterDiscount;

    this.vatAmount =  this.totalAmountWithoutDiscount -  this.htTotalAmount;
  }
  /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
  getAll() {
   this.getAllSubscription ?.unsubscribe();
   this.searchSubscription ?.unsubscribe();
    this.saleQuery = this.saleService.filter(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.searchFields);

    this.getAllSubscription = this.saleQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
      if (response.data.getAllTransaction.length > 0) {
        this.pagination.totalItems = response.data.getAllTransaction[0].count;
      }
      this.dataLoading = false;
      this.lstSale = response.data.getAllTransaction;
    });
  }

}

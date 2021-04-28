import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryModel } from 'src/models/inventory';
import { Pagination } from 'src/models/pagination';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {
  inventory: InventoryModel | undefined;
  lstInventory: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
  };
  constructor(private route: ActivatedRoute,
              private router: Router,
              private inventoryService: InventoryService
              ) {

            }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
          const id = +params['id'];
          this.getSupplierById(id);
      }
    );
  }

  viewInventory(id: number) {
    this.router.navigate([`/inventory/${id}`]);
  }

  getSupplierById(_inventoryId: number) {
    this.inventory = undefined;
    this.inventory = this.inventoryService.getById(_inventoryId);
    this.getAll();
  }

  getAll() {
    //#region Dummy Data
    this.lstInventory = this.inventoryService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  updateInventory(_productId: number) {
    this.router.navigate([`/update-inventory/${this.inventory?.id}`], {queryParams: {_productId: _productId}});
  }

}

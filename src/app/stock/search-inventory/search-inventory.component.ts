import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-search-inventory',
  templateUrl: './search-inventory.component.html',
  styleUrls: ['./search-inventory.component.css']
})
export class SearchInventoryComponent implements OnInit {
  lstInventory: any;
  moreInformation = false;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
    maxSize : 5
  };
  searching = false;
  searchFields: any = {
    transactionNumber: '',
    method: '',
    galenicForm: '',
    zone: '',
    status: ''
  };
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataLoading: boolean = true;

  constructor(private inventoryService: InventoryService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstInventory = this.inventoryService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.allInventory ', this.lstInventory);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  toogleMoreInformation() {
    this.moreInformation = !this.moreInformation;
  }

  viewInventory(id: number) {
    this.router.navigate([`/inventory/${id}`]);
  }
  searchItems() {
    this.lstInventory = this.inventoryService.search(this.searchFields);
    console.log(this.lstInventory);
  }
}

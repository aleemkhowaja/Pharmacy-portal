import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { ImportService } from '../import.service';

@Component({
  selector: 'app-search-import',
  templateUrl: './search-import.component.html',
  styleUrls: ['./search-import.component.css']
})
export class SearchImportComponent implements OnInit {
  lstImport: any;
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
    fileName: '',
    successessNumber: '',
    failuresNumber: '',
    importedBy: '',
    importedOn: ''
  };
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataLoading: boolean = true;

  constructor(private importService: ImportService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstImport = this.importService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.allImport ', this.lstImport);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  toogleMoreInformation() {
    this.moreInformation = !this.moreInformation;
  }

  viewImport(id: number) {
    this.router.navigate([`/import/${id}`]);
  }

  searchItems() {
    this.lstImport = this.importService.search(this.searchFields);
    console.log(this.lstImport);
  }

}

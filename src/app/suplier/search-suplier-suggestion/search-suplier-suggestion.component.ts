import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { SuplierService } from '../suplier.service';

@Component({
  selector: 'app-search-suplier-suggestion',
  templateUrl: './search-suplier-suggestion.component.html',
  styleUrls: ['./search-suplier-suggestion.component.css']
})
export class SearchSuplierSuggestionComponent implements OnInit {
  lstSuplier: any;
  moreInformation = false;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
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

  constructor(private suplierService: SuplierService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstSuplier = this.suplierService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.allSuplier ', this.lstSuplier);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  toogleMoreInformation() {
    this.moreInformation = !this.moreInformation;
  }

  viewSuplier(id: number) {
    this.router.navigate([`/suplier-suggestion/${id}`]);
  }

  searchItems() {
    this.lstSuplier = this.suplierService.search(this.searchFields);
    console.log(this.lstSuplier);
  }
}

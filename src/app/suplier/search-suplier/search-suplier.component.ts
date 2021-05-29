import { untilDestroyed } from '@ngneat/until-destroy';
import { QueryRef } from 'apollo-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Pagination } from 'src/models/pagination';
import { SuplierService } from '../suplier.service';

@Component({
  selector: 'app-search-suplier',
  templateUrl: './search-suplier.component.html',
  styleUrls: ['./search-suplier.component.css']
})
export class SearchSuplierComponent implements OnInit {
  lstSuplier: any;
  moreInformation = false;
  clientQuery: QueryRef<any> | undefined;

  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    maxSize : 5
  };
  
  searching = false;
  searchFields: any = {
    fileName: '',
    successessNumber: '',
    failuresNumber: '',
    importedBy: '',
    importedOn: '',
    lastName:'',
    telephone:'',
    city : '',
    balance : 0
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

    /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
     getAll() {

      //  this.getAllSubscription?.unsubscribe();
      //  this.searchSubscription?.unsubscribe();
    
        this.clientQuery = this.suplierService.filter(this.pagination.currentPage,
          this.pagination.itemsPerPage,  this.searchFields);
    
         this.clientQuery.valueChanges.pipe().subscribe(response=> {
            if(response.data.getAllSuppliers.length > 0)
              this.pagination.totalItems = response.data.getAllSuppliers[0].count;
              this.dataLoading = false;
              this.lstSuplier = response.data.getAllSuppliers;
            });
      }

  // getAll() {
  //   this.dataLoading = false;
  //   //#region Dummy Data
  //   this.lstSuplier = this.suplierService.getAll(
  //     this.pagination.currentPage,
  //     this.pagination.itemsPerPage
  //   );
  //   //#endregion

  //   console.log('this.allSuplier ', this.lstSuplier);
  // }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

  toogleMoreInformation() {
    this.moreInformation = !this.moreInformation;
  }

  viewSuplier(id: number) {
    this.router.navigate([`/suplier/${id}`]);
  }

  searchItems() {
    this.lstSuplier = this.suplierService.search(this.searchFields);
    console.log(this.lstSuplier);
  }

}

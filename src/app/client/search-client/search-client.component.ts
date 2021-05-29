import { ClientTypeService } from './../../common-services/client-type/client-type.service';
import { Select } from './../../../models/select';
import { ClientModel } from 'src/models/client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../client.service';
import { Pagination } from 'src/models/pagination';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css'],
})
@UntilDestroy()
export class SearchClientComponent implements OnInit {

  clientQuery: QueryRef<any> | undefined;
  getAllSubscription: Subscription | undefined;
  searchSubscription: Subscription | undefined;

  types: Select[] = [];
  
  searching = false;
  searchFields: ClientModel = {
    email: '',
    phone: '',
    cin: '',
    cnss: '',
    creditLimit: '',
    lastName:'',
    typeId : 0
  };

  lstClient: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    maxSize : 5
  };

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataLoading: boolean = true;

  constructor(private clientService: ClientService, 
              private clientType : ClientTypeService) {}

  ngOnInit(): void {
    
    /**
     * get All Clients
     */
    this.getAll();

    /**
     * refetch the data
     */
    this.clientQuery?.refetch();

    /**
     * init client types
     */
    this.initClientTypes();
  }

    /**
   * init all client types
   */
     public initClientTypes() {
      this.clientType.filter().pipe(untilDestroyed(this)).subscribe(response => {
        this.types = response.data.getAllTypes;
      });
    }

  /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
  getAll() {

    this.getAllSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();

    this.clientQuery = this.clientService.filter(this.pagination.currentPage,
      this.pagination.itemsPerPage,  this.searchFields);

      this.getAllSubscription = this.clientQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
        if(response.data.getAllCustomers.length > 0)
          this.pagination.totalItems = response.data.getAllCustomers[0].count;
          this.dataLoading = false;
          this.lstClient = response.data.getAllCustomers;
        });
  }

  ngOnDestroy() {
  //  this.querySubscription?.unsubscribe();
  console.log("destroy");
  // this.getAllSubscription?.unsubscribe();
  //   this.searchSubscription?.unsubscribe();

  }


  /**
   * This function will call while paginition
   * @param pageNumber 
   */
  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }


  /**
   * This function will call while filter/search
   */
  searchItems() {

   this.getAllSubscription?.unsubscribe();
   this.searchSubscription?.unsubscribe();

    //this.searchFields.type?.id = this.searchFields.typeId;

    this.clientQuery = this.clientService.filter(1, 5, this.searchFields);

    this.searchSubscription = this.clientQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
        if(response.data.getAllCustomers.length > 0)
          this.pagination.totalItems = response.data.getAllCustomers[0].count;
          this.dataLoading = false;
          this.lstClient = response.data.getAllCustomers;
          console.log(this.lstClient);
        });
  }

  /**
   * Call this function to view the record
   * while click on record from
   * @param clientModel 
   */
  viewClient(clientModel : ClientModel)
  {
      
  }

}

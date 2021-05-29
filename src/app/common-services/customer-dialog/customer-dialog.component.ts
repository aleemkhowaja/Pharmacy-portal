import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ClientService } from './../../client/client.service';
import { Pagination } from './../../../models/pagination';
import { ClientModel } from './../../../models/client';
import { Subscription } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  clientQuery: QueryRef<any> | undefined;
  getAllSubscription: Subscription | undefined;
  searchSubscription: Subscription | undefined;
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
  dataLoading: boolean = true;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private clientService: ClientService, public bsModalRef: BsModalRef) { }

  ngOnInit(): void {

    console.log("8888");

    /**
     * get All Clients
     */
    this.getAll();

    /**
     * refetch the data
     */
    this.clientQuery?.refetch();
  }

    /**
     * This function will call while initialize the components
     * to retrieve all records with filter , paginition
     */
    getAll() {  
      this.clientQuery = this.clientService.filter(this.pagination.currentPage,
        this.pagination.itemsPerPage,  this.searchFields);
  
        this.getAllSubscription = this.clientQuery.valueChanges.subscribe(response=> {
          if(response.data.getAllCustomers.length > 0)
            this.pagination.totalItems = response.data.getAllCustomers[0].count;
            this.dataLoading = false;
            this.lstClient = response.data.getAllCustomers;
            this.getAllSubscription?.unsubscribe();
          });
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
    searchCustomersDiloagItems() 
    {      
       this.clientQuery = this.clientService.filter(1,5, this.searchFields);
   
        this.getAllSubscription = this.clientQuery.valueChanges.subscribe(response=> {
           if(response.data.getAllCustomers.length > 0)
             this.pagination.totalItems = response.data.getAllCustomers[0].count;
             this.dataLoading = false;
             this.lstClient = response.data.getAllCustomers;
             this.getAllSubscription?.unsubscribe();
             console.log(this.lstClient);
        });
     }

     setCustomerId(name : string)
     {
      this.triggerEvent(name);
      this.bsModalRef.hide();
     }

     triggerEvent(name: string) {
      this.event.emit({ data: name , res:200 });
    }
}


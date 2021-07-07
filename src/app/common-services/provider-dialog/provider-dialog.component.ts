import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProviderService } from '../provider/provider.service';
import { Pagination } from './../../../models/pagination';
import { ProviderModel } from './../../../models/Provider';
import { Subscription } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-provider-dialog',
  templateUrl: './provider-dialog.component.html',
  styleUrls: ['./provider-dialog.component.css']
})
export class ProviderDialogComponent implements OnInit {

  providerQuery: QueryRef<any> | undefined;
  getAllSubscription: Subscription | undefined;
  searchSubscription: Subscription | undefined;

  searchFields: ProviderModel = {
    name: '',
    phone: '',
  };

  lstProvider: any;

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
  constructor(private providerService:ProviderService,
              public bsModalRef: BsModalRef) { }

  ngOnInit(): void {

     /**
     * get All Clients
     */
      this.getAll();

      /**
       * refetch the data
       */
      this.providerQuery?.refetch();
  }

  
    /**
     * This function will call while initialize the components
     * to retrieve all records with filter , paginition
     */
     getAll() {  
      this.providerQuery = this.providerService.filter(this.pagination.currentPage,
        this.pagination.itemsPerPage,  this.searchFields);
  
        this.getAllSubscription = this.providerQuery.valueChanges.subscribe(response=> {
          if(response.data.getAllProviders.length > 0)
            this.pagination.totalItems = response.data.getAllProviders[0].count;
            this.dataLoading = false;
            this.lstProvider = response.data.getAllProviders;
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
    searchProviderDiloagItems() 
    {  
      
      
      this.providerQuery = this.providerService.filter(1,5, this.searchFields);
   
      this.getAllSubscription = this.providerQuery.valueChanges.subscribe(response=> {
         if(response.data.getAllProvider.length > 0)
           this.pagination.totalItems = response.data.getAllProvider[0].count;
           this.dataLoading = false;
           this.lstProvider = response.data.getAllProvider;
           this.getAllSubscription?.unsubscribe();
           console.log(this.lstProvider);
      });




       
     }

     setProviderId(name : string)
     {
      this.triggerEvent(name);
      this.bsModalRef.hide();
     }


    triggerEvent(name: string) {
      this.event.emit({ data: name , res:200 });
    }

  

}

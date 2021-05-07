import { Select } from './../../../models/select';
import { ClientModel } from 'src/models/client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../client.service';
import { Pagination } from 'src/models/pagination';
import { StrNgCombo } from 'src/models/strNgCombo';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css'],
})
export class SearchClientComponent implements OnInit {

  types: Select[] = [
    // { name: 'Non', id: "1" },
    // { name: 'Client régulier', id: "2" },
    // { name: 'Client passager', id: "3" },
    // { name: 'Pharmacie', id: "4" },
  ];
  
  searching = false;
  searchFields: ClientModel = {
    email: '',
    phone: '',
    cin: '',
    cnss: '',
    creditLimit: '',
    lastName:'',
  };

  lstClient: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
  };

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataLoading: boolean = true;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
  getAll(){
    this.clientService.filter(this.pagination.currentPage,
    this.pagination.itemsPerPage,  this.searchFields).subscribe(response=> {

      if(response.data.getAllCustomers.length > 0)
        this.pagination.totalItems = response.data.getAllCustomers[0].count;
              
        this.dataLoading = false;
        this.lstClient = response.data.getAllCustomers;
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
  searchItems() {
    this.clientService.filter(1, 5, this.searchFields)
    .subscribe(response=> {

      if(response.data.getAllCustomers.length > 0)
          this.pagination.totalItems = response.data.getAllCustomers[0].count;
          
    this.dataLoading = false;
    this.lstClient = response.data.getAllCustomers;
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

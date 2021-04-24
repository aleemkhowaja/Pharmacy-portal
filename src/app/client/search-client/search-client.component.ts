import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../client.service';
import { ClientModel } from 'src/models/client';
import { Pagination } from 'src/models/pagination';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css'],
})
export class SearchClientComponent implements OnInit {
  lstClient: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
  };
  displayedColumns: string[] = [
    'Nom',
    'Taper',
    'Email',
    'Phone No.',
    'CIN',
    'CNSS',
  ];

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

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstClient = this.clientService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.allClients ', this.lstClient);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }
}

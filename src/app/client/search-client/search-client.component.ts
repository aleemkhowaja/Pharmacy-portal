import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from 'src/models/client';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {

  displayedColumns: string[] = ['Nom', 'Taper', 'Email', 'Phone No.', 'CIN', 'CNSS'];
  todoDatasource!: MatTableDataSource<unknown>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  dataLoading: boolean = true;
  

  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
    this.getAll();
  }

    getAll(){
      this.clientService.getAll().subscribe(response=> {
        this.dataLoading = false;
        console.log('response ',response.data.getAllCustomers);
        this.todoDatasource = new MatTableDataSource(response.data.getAllCustomers);
        this.todoDatasource.paginator = this.paginator;
        this.todoDatasource.sort = this.sort;
        console.log('this.allClients ',this.todoDatasource);
      });
    } 

}

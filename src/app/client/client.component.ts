import { ClientService } from './client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from 'src/models/client';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  // displayedColumns: string[] = ['Nom', 'Taper', 'Email', 'Phone No.', 'CIN', 'CNSS'];
  // todoDatasource!: MatTableDataSource<unknown>;

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  // @ViewChild(MatSort) 
  // sort!: MatSort;

  // dataLoading: boolean = true;

  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
    //this.getAll();
  }

  // getAll(){
  //   this.clientService.getAll().subscribe(response=> {
  //     this.dataLoading = false;
  //     console.log('response ',response.data.getAllCustomers);
  //     this.todoDatasource = new MatTableDataSource(response.data.getAllCustomers);
  //     this.todoDatasource.paginator = this.paginator;
  //     this.todoDatasource.sort = this.sort;
  //     console.log('this.allClients ',this.todoDatasource);
  // });

// }\

}

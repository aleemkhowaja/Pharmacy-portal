import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/client/client.service';
import { Pagination } from 'src/models/pagination';

@Component({
  selector: 'app-search-archive',
  templateUrl: './search-archive.component.html',
  styleUrls: ['./search-archive.component.scss'],
})
export class SearchArchiveComponent implements OnInit {
  lstArchive: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 5,
    maxSize : 5
  };

  dataLoading: boolean = true;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dataLoading = false;
    //#region Dummy Data
    this.lstArchive = this.clientService.getAll(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    );
    //#endregion

    console.log('this.allArchvie ', this.lstArchive);
  }

  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }
}

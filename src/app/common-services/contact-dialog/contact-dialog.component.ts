import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../common/util/utility.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {

  constructor(public utitlityService: UtilityService) { }

  ngOnInit(): void {
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

}

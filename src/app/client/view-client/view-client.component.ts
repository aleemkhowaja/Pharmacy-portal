import { Select } from './../../../models/select';
import { Pagination } from './../../../models/pagination';
import { ClientTypeService } from './../../common-services/client-type/client-type.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ClientModel } from 'src/models/client';
import { QueryRef } from 'apollo-angular';
import { ClientService } from './../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
@UntilDestroy()
export class ViewClientComponent implements OnInit {

  clientQuery: QueryRef < any > | undefined;
  addEditClientDto: ClientModel | undefined;
  lstClient: any;
  pagination: Pagination = {
    totalPages: 2,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    maxSize : 2
  };
  types: Select[] = [];

  searching = false;
  searchFields: ClientModel = {
    email: '',
    phone: '',
    cin: '',
    cnss: '',
    creditLimit: '',
    lastName: '',
    typeId: 0
  };
  dataLoading: boolean = true;

  addClientForm = this.fb.group({
    id: [''],
    manager: [null, Validators.required],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    cin: [''],
    type: ['', Validators.required],
    cnss: [''],
    email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phone: [''],
    doctorId: [''],
    creditLimit: [''],
    registerationNumber: [''],
    affiliateNumber: [''],
    organization: ['', [Validators.required]],
    address: [''],
    city: [''],
    postalCode: [''],
    country: ['', [Validators.required]],
    description: ['']
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private clientService: ClientService,
    private router: Router
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  
  }

  ngOnInit(): void {
    const _clientId: number = this.route.snapshot.params.id;
    console.log("===----"+_clientId);
    if (_clientId > 0) {
      this.getById(_clientId);
      this.clientQuery ?.refetch();
    }
  }

  /**
   * This function will call while initialize the components
   * to retrieve all records with filter , paginition
   */
  getAll() {
    this.clientQuery = this.clientService.filter(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.searchFields);

    this.clientQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
      if (response.data.getAllCustomers.length > 0)
        this.pagination.totalItems = response.data.getAllCustomers[0].count;
      this.dataLoading = false;
      this.lstClient = response.data.getAllCustomers;
    });
  }

  /**
   * 
   * @param id view Client
   */
  viewClient(id: number) {

    this.ngOnInit();
  }

  /**
   * get Client/customer by id
   * @param _clientId 
   */
  getById(_clientId: number) {
    console.log("==="+_clientId);
    this.clientQuery = this.clientService.getById(_clientId);

    this.clientQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response => {
      this.addEditClientDto = response.data.customerById;
    });

    this.getAll();
  }

  /**
   * This function will call while paginition
   * @param pageNumber 
   */
  loadLst(pageNumber: number) {
    this.pagination.currentPage = pageNumber;
    this.getAll();
  }

}

import { OrganizationService } from './../../common-services/organization/organization.service';
import { ClientTypeService } from '../../common-services/client-type/client-type.service';
import { ManagerService } from '../../common-services/manager/manager.service';
import { Select } from './../../../models/select';
import { CountryService } from '../../common-services/country/country.service';
import { UtilityService } from './../../common/util/utility.service';
import { StrNgCombo } from './../../../models/strNgCombo';
import { ClientModel } from 'src/models/client';
import { ClientService } from './../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'


import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SAVE_MESSAGE } from 'src/app/common/constants/constants.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit, AfterViewInit {
  
  addEditClientDto: ClientModel | undefined;

  addClientForm = this.fb.group({
    id : [''],
    manager: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    cin: [''],
    type: ['', Validators.required],
    cnss: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    doctorId: [''],
    creditLimit: [''],
    registerationNumber: [''],
    affiliateNumber: [''],
    organization : ['', [Validators.required]],
    address: [''],
    city: [''],
    postalCode: [''],
    country: ['', [Validators.required]],
    description : ['']
  });

  managers: Select[] = [
    // { name: 'manager-1', id: "1" },
    // { name:'manager-2',  id:  "2" },
    // { name: 'manager-3', id: "3" },
  ];

  types: Select[] = [
    // { name: 'type1', id:  "1" },
    // { name: 'type2', id:  "2" },
    // { name: 'type3', id:  "3" },
  ];

  countries: Select[] = [];

  doctors: Select[] = [
    // { name: 'doctor1', id: "1" },
    // { name: 'doctor2', id: "2" },
    // { name: 'doctor3', id: "3" },
    // { name: 'doctor4', id: "4" },
  ];

  organizations: Select[] = [
    // { name: 'org1',  id: "1" },
    // { name: 'org2',  id: "2" },
    // { name: 'org3',  id: "3" },
    // { name: 'org4',  id: "4" },
  ];

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private clientSv: ClientService,
    private cdr: ChangeDetectorRef,
    private utility: UtilityService,
    private country : CountryService,
    private manager : ManagerService,
    private clientType : ClientTypeService ,
    private organization : OrganizationService
  ) {}

  get f() { return this.addClientForm.controls; }

  ngOnInit(): void {
    const _clientId: number = this.router.snapshot.params.id;
    if(_clientId > 0 )
    this.getById(_clientId);

    /**
     * initialize countries
     */
    this.initCountris();

    /**
     * initialize the manages
     */
    this.initManagers();

    /**
     * initialize client types
     */
     this.initClientTypes();


     /**
      * init organizations
      */
     this.initOrganizations();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  public initDoctors(doctor?: { term: string; items: any[] }): void {}

  /**
   * init all countries
   */
  public initCountris() 
  {
    this.country.filter().subscribe(response=> {
          this.countries = response.data.getAllCountries;       
        });
  }


    /**
   * init all client types
   */
     public initClientTypes() 
     {
       this.clientType.filter().subscribe(response=> {
         console.log(response.data.getAllTypes);
             this.types = response.data.getAllTypes;       
           });
     }

          /**
         * init all managers
         */
          public initManagers() 
          {
            this.manager.filter().subscribe(response=> {
                  this.managers = response.data.getAllManagers;       
                });
          }

         /**
          * init all organization
          */
         public initOrganizations() {
           this.organization.filter().subscribe(response => {
             this.organizations = response.data.getAllOrganizations;
           });
         }

  /**
   * get Client/customer by id
   * @param _clientId 
   */
  getById(_clientId : number)
  {
    console.log("_clientId::"+_clientId);

    this.clientSv.getById(_clientId).subscribe(response=> {
      this.addEditClientDto = response.data.customerById;
      console.log(this.addEditClientDto);

      if(this.addEditClientDto)
        this.addClientForm.patchValue(this.addEditClientDto);
        
          // set associate objects
          this.addClientForm.get('type')?.setValue(this.addEditClientDto?.type?.id);
          this.addClientForm.get('organization')?.setValue(this.addEditClientDto?.organization?.id);
          this.addClientForm.get('country')?.setValue(this.addEditClientDto?.country?.id);   
          this.addClientForm.get('manager')?.setValue(this.addEditClientDto?.manager?.id); 
    });
  }


/**
 * Submit the client/customer form
 * @returns
 */
  submitForm() 
  {
    if (!this.addClientForm.invalid) {
      return;
    }

    if(this.addClientForm.value.id)
      this.clientSv.update(this.addClientForm.value);
    else
      this.clientSv.save(this.addClientForm.value);

    Swal.fire(SAVE_MESSAGE)
  }

  onClientKeyPress(event: any) {
    this.utility.onKeyPress(event);
  }


}

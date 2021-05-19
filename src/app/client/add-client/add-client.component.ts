import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { DoctorService } from './../../common-services/doctor/doctor.service';
import { OrganizationService } from './../../common-services/organization/organization.service';
import { ClientTypeService } from '../../common-services/client-type/client-type.service';
import { ManagerService } from '../../common-services/manager/manager.service';
import { Select } from './../../../models/select';
import { CountryService } from '../../common-services/country/country.service';
import { UtilityService } from './../../common/util/utility.service';
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
@UntilDestroy()
export class AddClientComponent implements OnInit, AfterViewInit {
  
  addEditClientDto: ClientModel | undefined;
  getByIdSubscription: Subscription | undefined;
  clientQuery: QueryRef<any> | undefined;

  addClientForm = this.fb.group({
    id : [''],
    manager: [null, Validators.required],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    cin: [''],
    type: ['', Validators.required],
    cnss: [''],
    email: ['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phone: [''],
    doctor: [''],
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
  ];

  types: Select[] = [
  ];

  countries: Select[] = [];

  doctors: Select[] = [
  ];

  organizations: Select[] = [
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
    private organization : OrganizationService,
    private doctorService : DoctorService,
    private r: Router,
  ) {}

  get f() { return this.addClientForm.controls; }

  ngOnInit(): void {

    const _clientId: number = this.router.snapshot.params.id;

    if(_clientId > 0 )
    {
      this.getById(_clientId);
      this.clientQuery?.refetch();
    }
      

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

     /**
      * init doctors
      */
     this.initDoctors();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    
  }

  ngAfterViewInit() {}

  //public initDoctors(doctor?: { term: string; items: any[] }): void {}

  /**
   * init all countries
   */
  public initCountris() {
    this.country.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.countries = response.data.getAllCountries;
    });
  }


  /**
   * init all client types
   */
  public initClientTypes() {
    this.clientType.filter().pipe(untilDestroyed(this)).subscribe(response => {
      console.log(response.data.getAllTypes);
      this.types = response.data.getAllTypes;
    });
  }

  /**
   * init all managers
   */
  public initManagers() {
    this.manager.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.managers = response.data.getAllManagers;
    });
  }

  /**
   * init all organization
   */
  public initOrganizations() {
    this.organization.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.organizations = response.data.getAllOrganizations;
    });
  }
  /**
   * init all doctors
   */
  public initDoctors() {
    this.doctorService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.doctors = response.data.getAllDoctors;
    });
  }

  /**
   * get Client/customer by id
   * @param _clientId 
   */
  getById(_clientId : number)
  {
    this.clientQuery = this.clientSv.getById(_clientId);

    this.clientQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
      this.addEditClientDto = response.data.customerById;
      console.log(this.addEditClientDto);

      if(this.addEditClientDto)
        this.addClientForm.patchValue(this.addEditClientDto);
        
          // set associate objects
          this.addClientForm.get('type')?.setValue(this.addEditClientDto?.type?.id);
          this.addClientForm.get('organization')?.setValue(this.addEditClientDto?.organization?.id);
          this.addClientForm.get('country')?.setValue(this.addEditClientDto?.country?.id);   
          this.addClientForm.get('manager')?.setValue(this.addEditClientDto?.manager?.id);
          this.addClientForm.get('doctor')?.setValue(this.addEditClientDto?.doctor?.id); 
    });
  }


/**
 * Submit the client/customer form
 * @returns
 */
 public  submitForm()  : boolean | undefined
  {
   
    //this.getByIdSubscription?.unsubscribe();

    console.log(this.addClientForm.invalid);

    if (this.addClientForm.invalid) {
      alert('Please fill all the required fields to create a super hero!');
      return false;
    }

    if(this.addClientForm.value.id)
      this.clientSv.update(this.addClientForm.value).subscribe((response) => {
        Swal.fire(SAVE_MESSAGE)
        this.addClientForm.reset();
        this.r.navigate(['/client'], { replaceUrl: true });
       });
    else
      this.clientSv.save(this.addClientForm.value).subscribe(response=> {
        Swal.fire(SAVE_MESSAGE)
        this.addClientForm.reset();
        this.r.navigate(['/client'], { replaceUrl: true });
      });
    return true;
  }

  onClientKeyPress(event: any) {
    this.utility.onKeyPress(event);
  }



}

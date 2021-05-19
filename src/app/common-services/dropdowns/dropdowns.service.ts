import { DoctorService } from './../doctor/doctor.service';
import { OrganizationService } from './../organization/organization.service';
import { ClientTypeService } from './../client-type/client-type.service';
import { ManagerService } from './../manager/manager.service';
import { CountryService } from './../country/country.service';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DropdownsService {

  constructor(    
    private country : CountryService,
    private manager : ManagerService,
    private clientType : ClientTypeService ,
    private organization : OrganizationService,
    private doctorService : DoctorService) {}

  /**
   * init all client types
   */
  public initClientTypes() {
    this.clientType.filter().subscribe(response => {
      return response.data.getAllTypes;
    });
  }

  /**
   * init all managers
   */
  public initManagers() {
    this.manager.filter().subscribe(response => {
      return response.data.getAllManagers;
    });
  }

  /**
   * init all organization
   */
  public initOrganizations() {
    this.organization.filter().subscribe(response => {
      return response.data.getAllOrganizations;
    });
  }
  /**
   * init all doctors
   */
  public initDoctors() {
    this.doctorService.filter().subscribe(response => {
      return response.data.getAllDoctors;
    });
  }

  /**
   * init all countries
   */
  public initCountris() {
    this.country.filter().subscribe(response => {
      return response.data.getAllCountries;
    });
  }

}

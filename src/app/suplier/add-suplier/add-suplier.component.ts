import { CountryService } from './../../common-services/country/country.service';
import { ClientService } from './../../client/client.service';
import { Select } from './../../../models/select';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuplierModel } from 'src/models/suplier';
import { SuplierService } from '../suplier.service';
import { SAVE_MESSAGE } from 'src/app/common/constants/constants.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-suplier',
  templateUrl: './add-suplier.component.html',
  styleUrls: ['./add-suplier.component.css']
})
export class AddSuplierComponent implements OnInit {
  addEditSuplier: SuplierModel | undefined;
  addSuplierForm: FormGroup = this.fb.group({
    lastName: ['',  Validators.required],
    telephone: [''],
    email: ['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    fax: [''],
    website: [''],
    address: [''],
    city: [''],
    postalCode: [''],
    country: [''],
    description: [''],
    balance: ['']
  });

  get f() { return this.addSuplierForm.controls; }

  countries: Select[] = [];

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private suplierService: SuplierService,
    private cdr: ChangeDetectorRef,
    private country : CountryService,
    private r: Router
  ) {}

  ngOnInit(): void {

    /**
     * initialize countries
     */
     this.initCountris();

    const _suplierId: number = this.router.snapshot.params.id;
    console.log(_suplierId);
    this.addEditSuplier = this.suplierService.getById(_suplierId);
    if(this.addEditSuplier)
      this.addSuplierForm.patchValue(this.addEditSuplier);
    console.log(this.addEditSuplier);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  submitForm() {
   
    if (this.addSuplierForm.invalid) {
      alert('Please fill all the required fields to create a super hero!');
      return false;
    }
    this.suplierService.save(this.addSuplierForm.value).subscribe(response=> {
      Swal.fire(SAVE_MESSAGE)
      this.addSuplierForm.reset();
      this.r.navigate(['/client'], { replaceUrl: true });
    });
  return true;


    this.suplierService.save(this.addSuplierForm.value);

    console.log(this.addSuplierForm.value);
  }


  /**
   * init all countries
   */
   public initCountris() {
    this.country.filter().pipe().subscribe(response => {
      this.countries = response.data.getAllCountries;
    });
  }


}

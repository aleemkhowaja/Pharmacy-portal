import { StrNgCombo } from './../../../models/strNgCombo';
import { ClientModel } from 'src/models/client';
import { ClientService } from './../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit, AfterViewInit {
  addEditClientDto: ClientModel | undefined;
  addClientForm = this.fb.group({
    manager: [''],
    lastName: [''],
    cin: [''],
    type: [''],
    cnss: [''],
    email: [''],
    phone: [''],
    doctorId: [''],
    creditLimit: [''],
    registerationNumber: [''],
    affiliateNumber: [''],
    address: [''],
    city: [''],
    postalCode: [''],
    country: [''],
  });

  types: StrNgCombo[] = [
    { label: 'type1', value: '1' },
    { label: 'type2', value: '2' },
    { label: 'type3', value: '3' },
  ];
  countries: StrNgCombo[] = [
    { label: 'Country1', value: '1' },
    { label: 'Country2', value: '2' },
    { label: 'Country3', value: '3' },
    { label: 'Country4', value: '4' },
  ];
  doctors: StrNgCombo[] = [
    { label: 'doctor1', value: '1' },
    { label: 'doctor2', value: '2' },
    { label: 'doctor3', value: '3' },
    { label: 'doctor4', value: '4' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private clientSv: ClientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const _clientId: number = this.router.snapshot.params.id;
    if(_clientId > 0 )
     this.addEditClientDto = this.clientSv.getSpecificClient(_clientId);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  public initDoctors(doctor?: { term: string; items: any[] }): void {}

  submitForm() {}
}

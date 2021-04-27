import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SuplierModel } from 'src/models/suplier';
import { SuplierService } from '../suplier.service';

@Component({
  selector: 'app-add-suplier',
  templateUrl: './add-suplier.component.html',
  styleUrls: ['./add-suplier.component.css']
})
export class AddSuplierComponent implements OnInit {
  addEditSuplier: SuplierModel | undefined;
  addSuplierForm: FormGroup = this.fb.group({
    name: [''],
    phone: [''],
    email: [''],
    fax: [''],
    internetSite: [''],
    address: [''],
    city: [''],
    zipCode: [''],
    country: [''],
    description: [''],
    balance: ['']
  });
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private suplierService: SuplierService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
   
    const _suplierId: number = this.router.snapshot.params.id;
    console.log(_suplierId);
    this.addEditSuplier = this.suplierService.getSpecificSuplier(_suplierId);
    if(this.addEditSuplier) 
      this.addSuplierForm.patchValue(this.addEditSuplier);
    console.log(this.addEditSuplier);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  submitForm() {
    this.suplierService.save(this.addSuplierForm.value);
    
    console.log(this.addSuplierForm.value);
  }

}

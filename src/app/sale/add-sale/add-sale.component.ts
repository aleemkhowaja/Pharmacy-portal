import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { SaleModel } from 'src/models/sale';
import { StrNgCombo } from 'src/models/strNgCombo';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {
  addEditSaleDto: SaleModel | undefined;
  addSaleForm: FormGroup = this.fb.group({
    name: [''],
    barcode: [''],
    barcode2: [''],
    categoryId: [''],
    therapeuticClass: [''],
    galenicForm: [''],
    dci: [''],
    laboratory: [''],
    range: [''],
    
  });

  
  
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private saleService: SaleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const _saleId: number = this.router.snapshot.params.id;
    console.log(_saleId);
    this.addEditSaleDto = this.saleService.getSpecificProduct(_saleId);
    if (this.addEditSaleDto)
      this.addSaleForm.patchValue(this.addEditSaleDto);
    console.log(this.addEditSaleDto);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() { }

  submitForm() {
    this.saleService.save(this.addSaleForm.value);

    console.log(this.addSaleForm.value);
  }

}

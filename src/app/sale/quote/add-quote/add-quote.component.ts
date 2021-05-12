import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProductModel } from 'src/models/product';
import { StrNgCombo } from 'src/models/strNgCombo';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  addEditProductDto: ProductModel | undefined;
  addQuoteForm: FormGroup = this.fb.group({
    name: [''],
    barcode: [''],
    barcode2: [''],
    categoryId: [''],
    therapeuticClass: [''],
    galenicForm: [''],
    dci: [''],
    laboratory: [''],
    range: [''],
    subRange: [''],
    productTable: [''],
    prescriptionRequired: [false],
    marketProduct: [false],
    pph: [''],
    ppv: [''],
    vatOnPurchase: [''],
    vatOnSales: [''],
    isRefundable: [''],
    reimbursementBasis: [''],
    presentation: [''],
    excipients: [''],
    dosageForAdults: [''],
    indications: [''],
    drivingContraindications: [''],
    breastFeedingContraindications: [''],
    pregnancyContraindications: [''],
    productLabReference: [''],
    packaging: [''],
    monograph: [''],
    description: ['']
  });

  categories: StrNgCombo[] = [
    { label: 'category1', value: '1' },
    { label: 'category2', value: '2' },
    { label: 'category3', value: '3' },
  ];
  therapeuticClasses: StrNgCombo[] = [
    { label: 'class1', value: '1' },
    { label: 'class2', value: '2' },
    { label: 'class3', value: '3' },
  ];
  galenicForms: StrNgCombo[] = [
    { label: 'galenic form 1', value: '1' },
    { label: 'galenic form 2', value: '2' },
    { label: 'galenicForm 3', value: '3' },
  ];
  dcis: StrNgCombo[] = [
    { label: 'dci 1', value: '1' },
    { label: 'dci 2', value: '2' },
    { label: 'dci 3', value: '3' },
  ];
  ranges: StrNgCombo[] = [
    { label: 'range 1', value: '1' },
    { label: 'range 2', value: '2' },
    { label: 'range 3', value: '3' },
  ];
  subRanges: StrNgCombo[] = [
    { label: 'sub range 1', value: '1' },
    { label: 'sub range 2', value: '2' },
    { label: 'sub range 3', value: '3' },
  ];
  productTables: StrNgCombo[] = [
    { label: 'product table 1', value: '1' },
    { label: 'product table 2', value: '2' },
    { label: 'product table 3', value: '3' },
  ];
  vats: StrNgCombo[] = [
    { label: 'vat 1', value: '1' },
    { label: 'vat 2', value: '2' },
    { label: 'vat 3', value: '3' },
  ];
  refundables: StrNgCombo[] = [
    { label: 'ref 1', value: '1' },
    { label: 'ref 2', value: '2' },
    { label: 'ref 3', value: '3' },
  ];
  contraindications: StrNgCombo[] = [
    { label: 'contraindication 1', value: '1' },
    { label: 'contraindication 2', value: '2' },
    { label: 'contraindication 3', value: '3' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const _productId: number = this.router.snapshot.params.id;
    console.log(_productId);
    this.addEditProductDto = this.quoteService.getSpecificProduct(_productId);
    if(this.addEditProductDto)
      this.addQuoteForm.patchValue(this.addEditProductDto);
    console.log(this.addEditProductDto);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  submitForm() {
    this.quoteService.save(this.addQuoteForm.value);

    console.log(this.addQuoteForm.value);
  }

}

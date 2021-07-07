import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { CategoryService } from '../../../common-services/categories/category.service';
import { TherapeuticClassesService } from '../../../common-services/therapeuticClasses/therapeutic-classes.service';
import { PharmaceuticalFormService } from '../../../common-services/pharmaceuticalForm/pharmaceutical-form.service';
import { DciService } from '../../../common-services/dci/dci.service';
import { RangeService } from '../../../common-services/range/range.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SAVE_MESSAGE } from 'src/app/common/constants/constants.service';
import { QueryRef } from 'apollo-angular';
import Swal from 'sweetalert2'
import { StrNgCombo } from 'src/models/strNgCombo';
import { ProductSuggestionService } from '../product-suggestion.service';
import { Select } from 'src/models/select';
import { ProductSuggestionModel } from 'src/models/productSuggestionModel';

@Component({
  selector: 'app-add-product-suggestion',
  templateUrl: './add-product-suggestion.component.html',
  styleUrls: ['./add-product-suggestion.component.css']
})

@UntilDestroy()
export class AddProductSuggestionComponent implements OnInit {
  addEditProductDto: ProductSuggestionModel | undefined;
  productQuery: QueryRef<any> | undefined;

  addProductSuggestionForm: FormGroup = this.fb.group({
    id : [''],
    lastName: [''],
    barcode: [''],
    barcode2: [''],
    categoryId: [null],
    therapeuticClassId: [null],
    pharmaceuticalFormId: [null],
    dci: [null],
    laboratory: [''],
    range: [null],
    subRange: [''],
    productTable: [''],
    prescriptionRequired: [false],
    marketProduct: [false],
    pph: [''],
    ppv: [''],
    vatOnPurchase: [''],
    vatOnSales: [''],
    isRefundable: [false],
    reimbursementBasis: [''],
    presentation: [''],
    excipients: [''],
    dosageForAdults: [''],
    indications: [''],
    drivingContraindications: [null],
    breastFeedingContraindications: [null],
    pregnancyContraindications: [null],
    productLabReference: [null],
    packaging: [''],
    monograph: [''],
    description: ['']
  });

  categories: Select[] = [
  ];

  therapeuticClasses: Select[] = [
  ];

  pharmaceuticalForm: Select[] = [
  ];

  dcis: Select[] = [
  ];

  ranges: Select[] = [
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

  constructor(private fb: FormBuilder,
    private router: ActivatedRoute,
    private ProductSuggestionService : ProductSuggestionService,
    private categoryService : CategoryService,
    private therapeuticClassService : TherapeuticClassesService,
    private PharmaceuticalService : PharmaceuticalFormService,
    private dciService : DciService,
    private rangeService : RangeService,
    private cdr: ChangeDetectorRef,
    private r: Router) { }

  ngOnInit(): void {

    /*calling combo functions*/ 
    this.initCategories();
    this.initTherapeuticClasses();
    this.initDcis();
    this.initPharmaceuticalForm();
    this.initRange();
  }
  
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngAfterViewInit() {}

  public initCategories() {
    this.categoryService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.categories = response.data.getAllCategories;
    });
  }

  public initTherapeuticClasses() {
    this.therapeuticClassService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.therapeuticClasses = response.data.getAllTherapeuticClasses;
    });
  }

  public initPharmaceuticalForm() {
    this.PharmaceuticalService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.pharmaceuticalForm = response.data.getAllPharmaceuticalForms;
    });
  }

  public initDcis() {
    this.dciService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.dcis = response.data.getAllDCI;
    });
  }

  public initRange() {
    this.rangeService.filter().pipe(untilDestroyed(this)).subscribe(response => {
      this.ranges = response.data.getAllRanges;
    });
  }
   
  public  submitForm()  : boolean | undefined
  {
    /*if (this.addProductForm.invalid) {
      alert('Please fill all the required fields to create a super hero!');
      return false;
    }*/

    if(this.addProductSuggestionForm.value.id)
      this.ProductSuggestionService.update(this.addProductSuggestionForm.value).subscribe((response) => {
        Swal.fire(SAVE_MESSAGE)
        this.addProductSuggestionForm.reset();
        this.r.navigate(['/product-suggestion'], { replaceUrl: true });
       });
    else
      this.ProductSuggestionService.save(this.addProductSuggestionForm.value).subscribe(response=> {
        Swal.fire(SAVE_MESSAGE)
        this.addProductSuggestionForm.reset();
        this.r.navigate(['/product-suggestion'], { replaceUrl: true });
      });
    return true;
  }
}

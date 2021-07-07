import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service';
import { ProductModel } from 'src/models/product';
import { StrNgCombo } from 'src/models/strNgCombo';
import { ProductService } from '../product.service';
import { Select } from './../../../models/select';
import { CategoryService } from '../../common-services/categories/category.service';
import { TherapeuticClassesService } from '../../common-services/therapeuticClasses/therapeutic-classes.service';
import { PharmaceuticalFormService } from '../../common-services/pharmaceuticalForm/pharmaceutical-form.service';
import { DciService } from '../../common-services/dci/dci.service';
import { RangeService } from '../../common-services/range/range.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SAVE_MESSAGE } from 'src/app/common/constants/constants.service';
import { QueryRef } from 'apollo-angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

@UntilDestroy()
export class AddProductComponent implements OnInit {
  addEditProductDto: ProductModel | undefined;
  productQuery: QueryRef<any> | undefined;

  addProductForm: FormGroup = this.fb.group({
    id : [''],
    name: [''],
    barcode: [''],
    barcode2: [''],
    categoryId: [null],
    therapeuticClass: [null],
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

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private productService: ProductService,
    private categoryService : CategoryService,
    private therapeuticClassService : TherapeuticClassesService,
    private PharmaceuticalService : PharmaceuticalFormService,
    private dciService : DciService,
    private rangeService : RangeService,
    private cdr: ChangeDetectorRef,
    private r: Router,
  ) {}

  ngOnInit(): void {

    const _productId: number = this.router.snapshot.params.id;
    console.log(_productId);
    this.getById(_productId);
    if(this.addEditProductDto)
      this.addProductForm.patchValue(this.addEditProductDto);
     
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
  

  /**
   * get Client/customer by id
   * @param _productId 
   */
   getById(_productId : number)
   {
     this.productQuery = this.productService.getById(_productId);
 
     this.productQuery.valueChanges.pipe(untilDestroyed(this)).subscribe(response=> {
       this.addEditProductDto = response.data.ProductById;
       console.log(this.addEditProductDto);
 
       if(this.addEditProductDto)
         this.addProductForm.patchValue(this.addEditProductDto);
         
           // set associate objects
           this.addProductForm.get('category')?.setValue(this.addEditProductDto?.categoryModel?.id);
           this.addProductForm.get('therapeuticClass')?.setValue(this.addEditProductDto?.therapeuticClassModel?.id);
           this.addProductForm.get('pharmaceuticalForm')?.setValue(this.addEditProductDto?.pharmaceuticalFormModel?.id);   
           this.addProductForm.get('dci')?.setValue(this.addEditProductDto?.dciModel?.id);
           this.addProductForm.get('range1')?.setValue(this.addEditProductDto?.rangeModel?.id); 
     });
   }

   public  submitForm()  : boolean | undefined
   {
    
     //this.getByIdSubscription?.unsubscribe();
 
     console.log(this.addProductForm.invalid);
 
     /*if (this.addProductForm.invalid) {
       alert('Please fill all the required fields to create a super hero!');
       return false;
     }*/
 
     if(this.addProductForm.value.id)
       this.productService.update(this.addProductForm.value).subscribe((response) => {
         Swal.fire(SAVE_MESSAGE)
         this.addProductForm.reset();
         this.r.navigate(['/product'], { replaceUrl: true });
        });
     else
       this.productService.save(this.addProductForm.value).subscribe(response=> {
         Swal.fire(SAVE_MESSAGE)
         this.addProductForm.reset();
         this.r.navigate(['/product'], { replaceUrl: true });
       });
     return true;
   }

}

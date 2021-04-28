import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InventoryModel } from 'src/models/inventory';
import { StrNgCombo } from 'src/models/strNgCombo';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent implements OnInit {
  addEditInventory: InventoryModel | undefined;
  addInventoryForm: FormGroup = this.fb.group({
    dci: [''],
    contains: [''],
    barCode: [''],
    name: [''],
    totalPPV: [''],
    zone: [''],
    date: [''],
    zipCode: [''],
    country: [''],
    description: [''],
    balance: [''],
    products: []
  });
  dcis: StrNgCombo[] = [
    { label: 'dci 1', value: '1' },
    { label: 'dci 2', value: '2' },
    { label: 'dci 3', value: '3' },
  ];
  containslst: StrNgCombo[] = [
    { label: 'contains 1', value: '1' },
    { label: 'contains 2', value: '2' },
    { label: 'contains 3', value: '3' },
  ];
  zones: StrNgCombo[] = [
    { label: 'zone 1', value: '1' },
    { label: 'zone 2', value: '2' },
    { label: 'zone 3', value: '3' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const _inventoryId: number = this.router.snapshot.params.id;

    console.log(_inventoryId);
    this.addEditInventory = this.inventoryService.getById(_inventoryId);
    this.router.queryParams.subscribe(params => {
      let _productId = params['_productId'];

      this.addEditInventory?.products?.forEach(item => {
          item.opened = (item.id == _productId);
      });
    });
    if(this.addEditInventory)
      this.addInventoryForm.patchValue(this.addEditInventory);
    console.log(this.addEditInventory);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  submitForm() {
    this.inventoryService.save(this.addInventoryForm.value);

    console.log(this.addInventoryForm.value);
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImportModel } from 'src/models/import';
import { StrNgCombo } from 'src/models/strNgCombo';
import { ImportService } from '../import.service';

@Component({
  selector: 'app-add-import',
  templateUrl: './add-import.component.html',
  styleUrls: ['./add-import.component.css']
})
export class AddImportComponent implements OnInit {
  addEditImport: ImportModel | undefined;
  addImportForm: FormGroup = this.fb.group({
    exchangeMethod: [''],
    file: [''],
    zone: [''],
    importQuantityAs: ['']
  });
  exchangeMethods: StrNgCombo[] = [
    { label: 'method 1', value: '1' },
    { label: 'method 2', value: '2' },
    { label: 'method 3', value: '3' },
  ];
  quantities: StrNgCombo[] = [
    { label: 'quantity 1', value: '1' },
    { label: 'quantity 2', value: '2' },
    { label: 'quantity 3', value: '3' },
  ];
  zones: StrNgCombo[] = [
    { label: 'zone 1', value: '1' },
    { label: 'zone 2', value: '2' },
    { label: 'zone 3', value: '3' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private importService: ImportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const _importId: number = this.router.snapshot.params.id;

    console.log(_importId);
    this.addEditImport = this.importService.getById(_importId);
    if(this.addEditImport)
      this.addImportForm.patchValue(this.addEditImport);
    console.log(this.addEditImport);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  submitForm() {
    this.importService.save(this.addImportForm.value);

    console.log(this.addImportForm.value);
  }

}

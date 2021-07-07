import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaleDetailsDialogComponent } from './product-sale-details-dialog.component';

describe('ProductSaleDetailsDialogComponent', () => {
  let component: ProductSaleDetailsDialogComponent;
  let fixture: ComponentFixture<ProductSaleDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSaleDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSaleDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityDetailDialogComponent } from './product-quantity-detail-dialog.component';

describe('ProductQuantityDetailDialogComponent', () => {
  let component: ProductQuantityDetailDialogComponent;
  let fixture: ComponentFixture<ProductQuantityDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductQuantityDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuantityDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

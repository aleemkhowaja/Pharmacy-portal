import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDiscountDialogComponent } from './global-discount-dialog.component';

describe('GlobalDiscountDialogComponent', () => {
  let component: GlobalDiscountDialogComponent;
  let fixture: ComponentFixture<GlobalDiscountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalDiscountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDiscountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

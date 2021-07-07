import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterApprovePurchaseComponent } from './after-approve-purchase.component';

describe('AfterApprovePurchaseComponent', () => {
  let component: AfterApprovePurchaseComponent;
  let fixture: ComponentFixture<AfterApprovePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterApprovePurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterApprovePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySlipDetailComponent } from './delivery-slip-detail.component';

describe('DeliverySlipDetailComponent', () => {
  let component: DeliverySlipDetailComponent;
  let fixture: ComponentFixture<DeliverySlipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverySlipDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySlipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

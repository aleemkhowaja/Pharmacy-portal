import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySlipComponent } from './delivery-slip.component';

describe('DeliverySlipComponent', () => {
  let component: DeliverySlipComponent;
  let fixture: ComponentFixture<DeliverySlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverySlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

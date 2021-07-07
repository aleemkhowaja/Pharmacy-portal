import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProposalDetailsComponent } from './order-proposal-details.component';

describe('OrderProposalDetailsComponent', () => {
  let component: OrderProposalDetailsComponent;
  let fixture: ComponentFixture<OrderProposalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProposalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProposalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

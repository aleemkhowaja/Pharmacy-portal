import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProposalComponent } from './order-proposal.component';

describe('OrderProposalComponent', () => {
  let component: OrderProposalComponent;
  let fixture: ComponentFixture<OrderProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

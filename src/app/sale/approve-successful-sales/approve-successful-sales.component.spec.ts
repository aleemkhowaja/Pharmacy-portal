import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSuccessfulSalesComponent } from './approve-successful-sales.component';

describe('ApproveSuccessfulSalesComponent', () => {
  let component: ApproveSuccessfulSalesComponent;
  let fixture: ComponentFixture<ApproveSuccessfulSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSuccessfulSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSuccessfulSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

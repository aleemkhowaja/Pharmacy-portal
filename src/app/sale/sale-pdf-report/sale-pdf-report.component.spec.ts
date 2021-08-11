import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePdfReportComponent } from './sale-pdf-report.component';

describe('SalePdfReportComponent', () => {
  let component: SalePdfReportComponent;
  let fixture: ComponentFixture<SalePdfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalePdfReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePdfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterApproveSalesComponent } from './after-approve-sales.component';

describe('AfterApproveSalesComponent', () => {
  let component: AfterApproveSalesComponent;
  let fixture: ComponentFixture<AfterApproveSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterApproveSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterApproveSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleComponent } from './view-single.component';

describe('ViewSingleEmployeeComponent', () => {
  let component: ViewSingleComponent;
  let fixture: ComponentFixture<ViewSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

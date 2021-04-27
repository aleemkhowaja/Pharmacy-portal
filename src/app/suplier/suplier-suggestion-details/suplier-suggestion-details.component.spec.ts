import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplierSuggestionDetailsComponent } from './suplier-suggestion-details.component';

describe('SuplierSuggestionDetailsComponent', () => {
  let component: SuplierSuggestionDetailsComponent;
  let fixture: ComponentFixture<SuplierSuggestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplierSuggestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplierSuggestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

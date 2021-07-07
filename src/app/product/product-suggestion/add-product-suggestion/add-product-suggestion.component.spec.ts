import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSuggestionComponent } from './add-product-suggestion.component';

describe('AddProductSuggestionComponent', () => {
  let component: AddProductSuggestionComponent;
  let fixture: ComponentFixture<AddProductSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

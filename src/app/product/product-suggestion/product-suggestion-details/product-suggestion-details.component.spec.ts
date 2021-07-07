import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuggestionDetailsComponent } from './product-suggestion-details.component';

describe('ProductSuggestionDetailsComponent', () => {
  let component: ProductSuggestionDetailsComponent;
  let fixture: ComponentFixture<ProductSuggestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSuggestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSuggestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

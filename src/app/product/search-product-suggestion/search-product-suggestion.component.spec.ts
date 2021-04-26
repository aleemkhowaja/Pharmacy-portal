import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductSuggestionComponent } from './search-product-suggestion.component';

describe('SearchProductSuggestionComponent', () => {
  let component: SearchProductSuggestionComponent;
  let fixture: ComponentFixture<SearchProductSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

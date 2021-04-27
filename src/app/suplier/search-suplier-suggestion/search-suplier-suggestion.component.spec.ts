import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSuplierSuggestionComponent } from './search-suplier-suggestion.component';

describe('SearchSuplierSuggestionComponent', () => {
  let component: SearchSuplierSuggestionComponent;
  let fixture: ComponentFixture<SearchSuplierSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSuplierSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSuplierSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

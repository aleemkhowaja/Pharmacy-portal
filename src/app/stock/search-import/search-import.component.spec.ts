import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchImportComponent } from './search-import.component';

describe('SearchImportComponent', () => {
  let component: SearchImportComponent;
  let fixture: ComponentFixture<SearchImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

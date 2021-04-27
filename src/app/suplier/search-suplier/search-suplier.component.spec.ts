import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSuplierComponent } from './search-suplier.component';

describe('SearchSuplierComponent', () => {
  let component: SearchSuplierComponent;
  let fixture: ComponentFixture<SearchSuplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSuplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSuplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

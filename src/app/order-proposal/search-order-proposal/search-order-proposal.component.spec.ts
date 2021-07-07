import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrderProposalComponent } from './search-order-proposal.component';

describe('SearchOrderProposalComponent', () => {
  let component: SearchOrderProposalComponent;
  let fixture: ComponentFixture<SearchOrderProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOrderProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOrderProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

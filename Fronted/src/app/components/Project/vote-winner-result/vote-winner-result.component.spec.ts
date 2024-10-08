import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteWinnerResultsComponent } from './vote-winner-result.component';

describe('VoteWinnerResultsComponent', () => {
  let component: VoteWinnerResultsComponent;
  let fixture: ComponentFixture<VoteWinnerResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteWinnerResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteWinnerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

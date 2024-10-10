import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateResultComponent } from './candidate-result.component';

describe('CandidateResultComponent', () => {
  let component: CandidateResultComponent;
  let fixture: ComponentFixture<CandidateResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

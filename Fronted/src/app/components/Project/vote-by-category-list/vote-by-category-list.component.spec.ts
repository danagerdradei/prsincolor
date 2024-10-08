import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteByCategoryListComponent } from './vote-by-category-list.component';

describe('VoteByCategoryListComponent', () => {
  let component: VoteByCategoryListComponent;
  let fixture: ComponentFixture<VoteByCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteByCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteByCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

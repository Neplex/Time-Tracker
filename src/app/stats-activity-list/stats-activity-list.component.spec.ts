import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsActivityListComponent } from './stats-activity-list.component';

describe('StatsActivityListComponent', () => {
  let component: StatsActivityListComponent;
  let fixture: ComponentFixture<StatsActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieListItemComponent } from './categorie-list-item.component';

describe('CategorieListItemComponent', () => {
  let component: CategorieListItemComponent;
  let fixture: ComponentFixture<CategorieListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

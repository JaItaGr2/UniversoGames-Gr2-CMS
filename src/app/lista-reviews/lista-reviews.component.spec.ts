import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReviewsComponent } from './lista-reviews.component';

describe('ListaReviewsComponent', () => {
  let component: ListaReviewsComponent;
  let fixture: ComponentFixture<ListaReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

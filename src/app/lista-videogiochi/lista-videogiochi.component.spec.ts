import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVideogiochiComponent } from './lista-videogiochi.component';

describe('ListaVideogiochiComponent', () => {
  let component: ListaVideogiochiComponent;
  let fixture: ComponentFixture<ListaVideogiochiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaVideogiochiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVideogiochiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

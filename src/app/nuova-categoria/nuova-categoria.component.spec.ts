import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaCategoriaComponent } from './nuova-categoria.component';

describe('NuovaCategoriaComponent', () => {
  let component: NuovaCategoriaComponent;
  let fixture: ComponentFixture<NuovaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovaCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuovaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

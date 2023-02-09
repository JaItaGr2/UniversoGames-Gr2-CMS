import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoVideogiocoComponent } from './nuovo-videogioco.component';

describe('NuovoVideogiocoComponent', () => {
  let component: NuovoVideogiocoComponent;
  let fixture: ComponentFixture<NuovoVideogiocoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovoVideogiocoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuovoVideogiocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

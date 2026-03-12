import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRegistradosComponent } from './lista-registrados.component';

describe('ListaRegistradosComponent', () => {
  let component: ListaRegistradosComponent;
  let fixture: ComponentFixture<ListaRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRegistradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

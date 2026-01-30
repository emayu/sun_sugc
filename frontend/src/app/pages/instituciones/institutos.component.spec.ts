import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutosComponent } from './institutos.component';

describe('InstitutosComponent', () => {
  let component: InstitutosComponent;
  let fixture: ComponentFixture<InstitutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

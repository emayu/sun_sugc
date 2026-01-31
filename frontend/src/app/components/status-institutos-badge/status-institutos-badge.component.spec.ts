import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusInstitutosBadgeComponent } from './status-institutos-badge.component';

describe('StatusInstitutosBadgeComponent', () => {
  let component: StatusInstitutosBadgeComponent;
  let fixture: ComponentFixture<StatusInstitutosBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusInstitutosBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusInstitutosBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

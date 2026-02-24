import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnvioInvitacionComponent } from './dialog-envio-invitacion.component';

describe('DialogEnvioInvitacionComponent', () => {
  let component: DialogEnvioInvitacionComponent;
  let fixture: ComponentFixture<DialogEnvioInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEnvioInvitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEnvioInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

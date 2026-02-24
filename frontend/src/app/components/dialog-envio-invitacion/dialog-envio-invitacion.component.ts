import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InstitucionDto } from '../../pages/instituciones/institutos.component';
import { InstitucionesService } from '../../services/instituciones.service';


@Component({
  selector: 'app-dialog-envio-invitacion',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatChipsModule, MatIconModule, MatButtonModule,
    FormsModule, MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Enviar Invitación</h2>
    <mat-dialog-content [formGroup]="form">
      <h4>{{data.nombre_establecimiento}}</h4>
      <p>Confirme o agregue los correos electrónicos de destino</p>
      <div formArrayName="emails">
        @for (control of emailsFormArray.controls; track $index) {
          <div class="email-row">
            <mat-form-field  class="full-width">
              <mat-label>Correo Electrónico</mat-label>
              <input matInput [formControlName]="$index" placeholder="ejemplo@correo.com">
              @if (control.invalid ) {
                <mat-error>Ingrese un correo válido</mat-error>
              }
            </mat-form-field>
            
            <button mat-icon-button color="warn" (click)="removeEmail($index)" [disabled]="emailsFormArray.length === 1">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        }
      </div>

      <button mat-button color="primary" (click)="addEmail('')">
        <mat-icon>add</mat-icon> Agregar otro correo
      </button>
      @if(errorMessage){
        <mat-error class="error-message">{{errorMessage}}</mat-error>
      }
      
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary"  
              (click)="confirm()"
              [disabled]="form.invalid || isSendingInvitacion">
        Enviar Invitación
        @if(isSendingInvitacion){
          <mat-icon><mat-spinner diameter="20" ></mat-spinner></mat-icon>
        }
      </button>
    </mat-dialog-actions>
    
  `,
  styles: [`
    .email-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .full-width { flex-grow: 1; }
    .error-message { text-align: end; }
  `]
})
export class DialogEnvioInvitacionComponent implements OnInit {
   
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DialogEnvioInvitacionComponent>);
  data = inject<InstitucionDto>(MAT_DIALOG_DATA);
  form = this.fb.group({
    emails: this.fb.array([])
  });

  private institucionesService = inject(InstitucionesService);
  isSendingInvitacion = false;
  errorMessage = '';

  ngOnInit(): void {
    if(this.data.email_1){
      this.addEmail(this.data.email_1);
    }
    if(this.data.email_2){
      this.addEmail(this.data.email_2);
    }
    if(this.emailsFormArray.length === 0){
      this.addEmail('');
    }
  }

  addEmail(email:string){
    this.emailsFormArray.push(this.fb.control(email, [Validators.required, Validators.email]));
  }

  removeEmail(index:number){
    if(this.emailsFormArray.length > 1){
      this.emailsFormArray.removeAt(index);
    }
  }

  confirm(){
    if(this.form.valid){
      this.isSendingInvitacion = true;
			this.institucionesService.sendInvitacionEmail(this.data.id!, {
				destinatarios: this.form.value.emails
			})
			.subscribe( {
				next: response => {
				this.dialogRef.close(response);
			},
			error: error => {
				this.errorMessage = 'No fue posible enviar el correo: ' + error;
			}
			}).add( () => this.isSendingInvitacion = false );
    }
  }

  get emailsFormArray(){
    return this.form.get('emails') as FormArray;
  }
}

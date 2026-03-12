import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InstitucionesService, ResultadoBitacoraDto, InstitucionDto } from '../../services/instituciones.service';
import { ResultadoGestionService } from '../../services/resultado-gestion.service';
import { InstitutoConfirmadoDTO } from '../../services/confirmados.service';
import { RegistroAsistenciaService } from '../../services/registro-asistencia.service';

@Component({
  selector: 'app-modal-registro',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDividerModule, MatListModule,
    MatIconModule, MatRadioModule, MatDatepickerModule,
    FormsModule, MatProgressSpinnerModule
  ],
  templateUrl: './modal-registro.component.html',
  styleUrl: './modal-registro.component.scss'
})
export class ModalRegistroComponent implements OnInit {

  private fb = inject(FormBuilder);
  registroForm!:FormGroup;
  isSaving = false;
  errorMessageOnSave = '';
  isLoadingInstitutoData = false;
  isNewRegister = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:InstitutoConfirmadoDTO,
    public registroAsistenciaService:RegistroAsistenciaService,
    public dialogReg:MatDialogRef<ModalRegistroComponent>,
    public institutosService:InstitucionesService
  ){
    
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    const esConfirmadoConEncargado = (this.data.estado_participacion === 'CONFIRMADO' && this.data.tiene_responsable === 'Si');
    if(!this.data.id){
      this.isNewRegister = true;
    }
    if( this.data.id  && this.data.estado_participacion === 'SIN_REGISTRO'){
    //verificar data    
    }

    this.registroForm = this.fb.group({
      id_institucion: [this.data.id],
      tipo_confirmacion: [this.data.estado_participacion, Validators.required],
      tipo_registro: [ esConfirmadoConEncargado ? "GRUPO_OFICIAL" : "INDIVIDUAL", Validators.required],
      nombre_establecimiento: [this.data.nombre_establecimiento, Validators.required],
      cantidad_estudiantes: [this.data.cantidad_graduandos, [Validators.required, Validators.min(1)]],
      nombre_encargado: [ (esConfirmadoConEncargado? this.data.nombre_responsable: ''), Validators.required], 
      correo_encargado: [''],
      tel_encargado: [ esConfirmadoConEncargado ? this.data.tel_responsable: ''], 
      salon_asignado: [null],
      correo_principal_institucion: ['', Validators.email],
      tel_principal_institucion: [''],
      observaciones: ['']
    });

    this.setupValidators();

  }

  private setupValidators(){
    const tipoRegistroControl = this.registroForm.get('tipo_registro');
    const correoEncargado = this.registroForm.get('correo_encargado');
    const telInstitucion = this.registroForm.get('tel_principal_institucion');
    const correoInstitucion = this.registroForm.get('correo_principal_institucion');


    tipoRegistroControl?.valueChanges.subscribe(tipo => {
      const esSinRegistro = this.data.estado_participacion === 'SIN_REGISTRO';
      if (tipo === 'GRUPO_OFICIAL' && esSinRegistro) {
        telInstitucion?.setValidators([Validators.required]);
        correoInstitucion?.setValidators([Validators.required, Validators.email]);

      } else {
        telInstitucion?.clearValidators();
        correoInstitucion?.clearValidators();
      }
      telInstitucion?.updateValueAndValidity();
      correoInstitucion?.updateValueAndValidity();
    });

  }

  guardar(){
    if(this.registroForm.invalid){
      this.registroForm.updateValueAndValidity()
      return;
    }
    this.isSaving = true;
    this.errorMessageOnSave = '';
    const payload = this.registroForm.value;
    this.registroAsistenciaService.createRegistroAsistencia(payload)
    .subscribe({
      next: result =>{
        console.log('result save', result);
        this.dialogReg.close(result);
      },
      error: err =>{
        this.errorMessageOnSave = err;
      }
    }).add(()=> this.isSaving = false)
  }

  consultarInstituto(){
    if(!this.data.id){
      return;
    }
    this.isLoadingInstitutoData = true;
    this.institutosService.getById(this.data.id)
    .subscribe({
      next: (response:InstitucionDto) => {
        let tel_principal;
        if(response.tel_1){
          tel_principal = response.tel_1;
        }else if(response.tel_2){
          tel_principal = response.tel_2;
        }
        let correo_principal;
        if(response.email_1){
          correo_principal = response.email_1;
        }else if(response.email_2){
          correo_principal = response.email_2;
        }

        if(tel_principal){
          const telInstitucion = this.registroForm.get('tel_principal_institucion');
          telInstitucion?.setValue(tel_principal)
        }
        if(correo_principal){
          const correoInstitucion = this.registroForm.get('correo_principal_institucion');
          correoInstitucion?.setValue(correo_principal);
        }
        
      }
    }).add(()=>this.isLoadingInstitutoData = false);
  }

}

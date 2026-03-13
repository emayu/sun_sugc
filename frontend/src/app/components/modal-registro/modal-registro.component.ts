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
import { RegistroAsistenciaDTO, RegistroAsistenciaService } from '../../services/registro-asistencia.service';

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
  hasRegisterInDB = false;
  isEditMode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:ModalRegistroContext,
    public registroAsistenciaService:RegistroAsistenciaService,
    public dialogReg:MatDialogRef<ModalRegistroComponent>,
    public institutosService:InstitucionesService
  ){
    
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.isEditMode = this.data.mode === 'EDIT'; 
    if (this.isEditMode) {
      const { registro } = this.data;
      this.hasRegisterInDB = !! registro?.id_institucion;
      this.registroForm = this.fb.group({
        id_institucion: [registro?.id_institucion],
        tipo_confirmacion: [registro?.tipo_confirmacion],
        tipo_registro: [registro?.tipo_registro, Validators.required],
        nombre_establecimiento: [registro?.nombre_establecimiento, Validators.required],
        cantidad_estudiantes: [registro?.cantidad_estudiantes, [Validators.required, Validators.min(1)]],
        nombre_encargado: [registro?.nombre_encargado, Validators.required],
        correo_encargado: [registro?.correo_encargado],
        tel_encargado: [registro?.tel_encargado],
        salon_asignado: [registro?.salon_asignado],
        correo_principal_institucion: [registro?.correo_principal_institucion],
        tel_principal_institucion: [registro?.tel_principal_institucion],
        observaciones: [registro?.observaciones]
      });
    }else{
      const { instituto: confirmado } = this.data;
      const esConfirmadoConEncargado = (confirmado!.estado_participacion === 'CONFIRMADO' && confirmado!.tiene_responsable === 'Si');
      this.hasRegisterInDB = !!confirmado?.id;

      this.registroForm = this.fb.group({
        id_institucion: [confirmado!.id],
        tipo_confirmacion: [confirmado!.estado_participacion, Validators.required],
        tipo_registro: [esConfirmadoConEncargado ? "GRUPO_OFICIAL" : "INDIVIDUAL", Validators.required],
        nombre_establecimiento: [confirmado!.nombre_establecimiento, Validators.required],
        cantidad_estudiantes: [confirmado!.cantidad_graduandos, [Validators.required, Validators.min(1)]],
        nombre_encargado: [(esConfirmadoConEncargado ? confirmado!.nombre_responsable : ''), Validators.required],
        correo_encargado: [''],
        tel_encargado: [esConfirmadoConEncargado ? confirmado!.tel_responsable : ''],
        salon_asignado: [null],
        correo_principal_institucion: [''],
        tel_principal_institucion: [''],
        observaciones: ['']
      });
    }
    this.setupValidators();
    

  }

  get tipoRegistroControl(){
    return this.registroForm.get('tipo_registro');
  }

  get tipoConfirmacionControl(){
    return this.registroForm.get('tipo_confirmacion');
  }

  private setupValidators() {
    const tipoRegistroControl = this.tipoRegistroControl;
    const tipoConfirmacionControl = this.tipoConfirmacionControl;

    const telefonoEncargado = this.registroForm.get('tel_encargado');
    const telInstitucion = this.registroForm.get('tel_principal_institucion');
    const correoInstitucion = this.registroForm.get('correo_principal_institucion');


    tipoRegistroControl?.valueChanges.subscribe(tipo => {
      const noEsConfirmado = tipoConfirmacionControl?.value !== 'CONFIRMADO';
      if (tipo === 'GRUPO_OFICIAL' && noEsConfirmado) {
        telInstitucion?.setValidators([Validators.required]);
        correoInstitucion?.setValidators([Validators.required]);
        telefonoEncargado?.setValidators([Validators.required])

      } else {
        telInstitucion?.clearValidators();
        telInstitucion?.patchValue('');
        correoInstitucion?.clearValidators();
        correoInstitucion?.patchValue('');
        telefonoEncargado?.clearValidators();
        telefonoEncargado?.patchValue('');
      }
      telInstitucion?.updateValueAndValidity();
      correoInstitucion?.updateValueAndValidity();
      telefonoEncargado?.updateValueAndValidity();
    });

  }

  guardar(){
    if(this.registroForm.invalid){
      this.registroForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.errorMessageOnSave = '';
    const payload = this.registroForm.value;
    const operacion = this.isEditMode
       ? this.registroAsistenciaService.updateRegistroAsistencia(this.data.registro!.id, payload)
       : this.registroAsistenciaService.createRegistroAsistencia(payload);
    operacion.subscribe({
      next: result =>{
        console.log('result operation', result);
        this.dialogReg.close(result);
      },
      error: err =>{
        this.errorMessageOnSave = err;
      }
    }).add(()=> this.isSaving = false)
  }

  consultarInstituto(){
    if(!this.data.instituto?.id){
      return;
    }
    this.isLoadingInstitutoData = true;
    this.institutosService.getById(this.data.instituto.id)
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

export interface ModalRegistroContext {
  mode: 'CREATE' | 'EDIT';
  registro?:RegistroAsistenciaDTO;
  instituto?: InstitutoConfirmadoDTO;
}

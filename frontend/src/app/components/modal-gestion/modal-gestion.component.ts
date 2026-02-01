import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { InstitucionesService, ResultadoBitacoraDto } from '../../services/instituciones.service';
import { InstitucionDto } from '../../pages/instituciones/institutos.component';
import { ResultadoGestionService } from '../../services/resultado-gestion.service';


@Component({
  selector: 'app-modal-gestion',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDividerModule, MatListModule,
    MatIconModule, MatRadioModule
  ],
  templateUrl: './modal-gestion.component.html',
  styleUrl: './modal-gestion.component.scss'
})
export class ModalGestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private institucionService = inject(InstitucionesService);
  private resultadoGestionService = inject(ResultadoGestionService);
  private dialogRef = inject(MatDialogRef<ModalGestionComponent>);

  gestionForm!: FormGroup;
  telefonosDisponibles: { label: string, numero: string, campo: string }[] = [];
  private resultadosGestion:ResultadoBitacoraDto[] = [];

  fechaInicio:Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
  ){
    this.fechaInicio = data.fechaInicio;
    this.initForm();
    this.prepararTelefonos();
  }
  ngOnInit(): void {
    this.resultadoGestionService.getAll().subscribe({
      next: result => {
        console.log(result);
        this.resultadosGestion = result;
      }
    });
  }

  initForm(){
    this.gestionForm = this.fb.group({
      accion: [this.data.accionInicial, Validators.required],
      id_resultado: [null, Validators.required],
      medio_contacto: [''],
      observaciones: [''],
      nuevo_telefono: [''], // Solo se llena si la acción es Investigación
      id_nuevo_estado_inst: [this.data.institucion.id_estado_institucion, Validators.required]
    });

    this.gestionForm.get('accion')?.valueChanges.subscribe( accionValue => {
      const nuevoMedioContacto = this.gestionForm.get('medio_contacto');
      if(accionValue === "LLAMADA" || accionValue === "WhatsApp"){
        nuevoMedioContacto?.setValidators([Validators.required]);
      }else{
        nuevoMedioContacto?.clearValidators();
        nuevoMedioContacto?.patchValue('');
      }
      nuevoMedioContacto?.updateValueAndValidity();
    });

    this.gestionForm.get('id_resultado')?.valueChanges.subscribe(idResultado => {
      const nuevoTelControl = this.gestionForm.get('nuevo_telefono');

      if (idResultado === 8) { // ID 8 = 'Dato Encontrado'
        nuevoTelControl?.setValidators([Validators.required, Validators.pattern(/^[0-9]{8}$/)]);
      } else {
        nuevoTelControl?.clearValidators();
        nuevoTelControl?.patchValue('');
      }

      nuevoTelControl?.updateValueAndValidity();
    })
  }

  prepararTelefonos() {
    const inst = this.data.institucion as InstitucionDto;
    if (inst.tel_1) this.telefonosDisponibles.push({ label: 'Teléfono 1', numero: inst.tel_1, campo: 'tel_1' });
    if (inst.tel_2) this.telefonosDisponibles.push({ label: 'Teléfono 2', numero: inst.tel_2, campo: 'tel_2' });
    if (inst.tel_nuevo_1) this.telefonosDisponibles.push({ label: 'Tel Nuevo 1', numero: inst.tel_nuevo_1, campo: 'tel_nuevo_1' });
    if (inst.tel_nuevo_2) this.telefonosDisponibles.push({ label: 'Tel Nuevo 2', numero: inst.tel_nuevo_2, campo: 'tel_nuevo_2' });
    if (inst.tel_nuevo_3) this.telefonosDisponibles.push({ label: 'Tel Nuevo 3', numero: inst.tel_nuevo_3, campo: 'tel_nuevo_3' });
  }

  ejecutarLlamada(tel:string){
    this.gestionForm.patchValue({medio_contacto: tel});
    window.location.href = `tel:${tel}`;
  }

  getTiposResultados(): ResultadoBitacoraDto[]{
    const value = this.gestionForm.get('accion')?.value;
    console.log(this.gestionForm);
    if(value === "LLAMADA" || value === "WhatsApp"){
      return this.resultadosGestion.filter( resultado => resultado.tipo === "LLAMADA");
    }else if(value === "INVESTIGACION"){
      return this.resultadosGestion.filter( resultado => resultado.tipo === value)
    }
    return [];
  }

  guardar() {
    if (this.gestionForm.invalid) return;

    const payload = {
      ...this.gestionForm.value,
      id_institucion: this.data.institucion.id,
      fecha_gestion_inicio: this.data.fechaInicio,
      fecha_gestion_final: new Date()
    };

    // this.gestionService.registrar(payload).subscribe({
    //   next: () => this.dialogRef.close(true),
    //   error: (err) => console.error('Error al guardar gestión', err)
    // });
  }


}

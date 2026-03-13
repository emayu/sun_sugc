import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RegistroAsistenciaDTO, RegistroAsistenciaService } from '../../../../services/registro-asistencia.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../../../../components/modal-registro/modal-registro.component';

registerLocaleData(localeEs);

@Component({
  selector: 'app-lista-registrados',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatCardModule, MatFormFieldModule,
    MatSelectModule, MatButtonModule, MatIconModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-GT' }
  ],
  templateUrl: './lista-registrados.component.html',
  styleUrl: './lista-registrados.component.scss'
})
export class ListaRegistradosComponent implements OnInit {

  isLoading = false;
  totalEstudiantes = 0;
  totalInstituciones = 0;
  registradosList: RegistroAsistenciaDTO[] = [];
  displayedColumns: string[] = ['hora', 'institucion', 'salon', 'cantidad', 'encargado', 'accion'];
  filtroTiempo:string = 'hoy';
  private dialog = inject(MatDialog);

  constructor(public registroAsistencia:RegistroAsistenciaService){

  }


  ngOnInit(): void {
    this.recargarLista();
  }

  recargarLista(){
    this.isLoading = true;
    this.registroAsistencia.getAll(this.filtroTiempo)
      .subscribe({
        next: response => {
          // console.log('registrados', response);
          this.registradosList = response;
        }
      }).add(()=> this.isLoading = false);
  }

  editarRegistro(data: RegistroAsistenciaDTO) {
    const dialog = this.dialog.open(ModalRegistroComponent, {
      data: {
        mode: 'EDIT',
        registro: data
      },
      width: '750px',
    });

    dialog.afterClosed().subscribe( result => {
      if(result){
        this.recargarLista();
      }
    });


  }
}

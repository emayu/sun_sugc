import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { InstitucionService } from '../../services/institucion.service';
// import { Institucion } from '../../models/institucion.interface';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InstitucionesService } from '../../services/instituciones.service';

@Component({
  selector: 'app-institutos',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatIconModule, 
    MatChipsModule, MatDialogModule, MatProgressSpinnerModule
  ],
  templateUrl: './institutos.component.html',
  styleUrl: './institutos.component.scss'
})
export class InstitutosComponent implements OnInit {

  dataSource = new MatTableDataSource<InstitucionDto>([]);
  displayedColumns: string[] = ['id', 'nombre', 'estado', 'telefonos', 'ultima_gestion', 'acciones'];
  isLoading = false;

  institucionesService = inject(InstitucionesService);
  ngOnInit(): void {
	console.log('init');
	this.isLoading = true;
    this.institucionesService.getAll().subscribe({
		next:(response) =>{
			console.log(response);
			this.dataSource.data = response;
		},
		complete: () => { this.isLoading = false;}
	});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  abrirGestion(inst: any) {
    // Aquí invocarás al Modal que creamos antes
    console.log('Abriendo gestión para:', inst.id);
  }

}


export interface InstitucionDto {
  id?: number;
	codigo_mineduc: string;
	distrito: string;
	departamento: string;
	municipio: string;
	nombre_establecimiento : string;
	direccion: string;
	sector: string;
	nivel: string;
	jornada: string;
	plan: string;
	cantidad_graduandos: number;
	supervisor : string;
	director: string;
	contacto_alterno : string;
	id_estado_institucion: number;
	id_responsable: number;
	ultima_gestion_at: Date;
	estado_mineduc: string;
	tel_1: string;
	estado_tel_1: string;
	tel_2: string;
	estado_tel_2: string;
	email_1: string;
	estado_email_1: string;
	email_2: string;
	estado_email_2: string;
	tel_nuevo_1: string;
	estado_tel_nuevo_1: string;
	tel_nuevo_2: string;
	estado_tel_nuevo_2: string;
	tel_nuevo_3: string;
	estado_tel_nuevo_3: string;
  estado?: {
    id: number;
    nombre: string;
    descripcion?: string;
  }
}
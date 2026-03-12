import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ConfirmadosService, InstitutoConfirmadoDTO } from '../../services/confirmados.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../../components/modal-registro/modal-registro.component';
import { ListaRegistradosComponent } from "./components/lista-registrados/lista-registrados.component";

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTabsModule, MatInputModule,
    MatFormFieldModule,
    MatIconModule, MatButtonModule,
    MatTableModule, MatDialogModule,
    ListaRegistradosComponent
],
  templateUrl: './recepcion.component.html',
  styleUrl: './recepcion.component.scss'
})
export class RecepcionComponent implements OnInit {
  
  confirmadosList: any[] = [];
  filtradosList: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'horario', 'encargado', 'accion'];
  searchTerm: string = '';
  @ViewChild('searchInput') searchInput!: ElementRef;
  confirmadosService = inject(ConfirmadosService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.confirmadosService.getAll()
    .subscribe({ next: response => {
      console.log(response);
      this.confirmadosList =  response;
      this.filtradosList = response;
    }})
  }


  onSearch() {
    let busquedaText = this.searchTerm.trim().toUpperCase();
    if(!busquedaText){
      this.filtradosList = this.confirmadosList;
    }
    if(busquedaText){
      const id = Number(busquedaText);
      this.filtradosList = this.confirmadosList.filter( (instituto:any) => {
        if(!Number.isNaN(id)){
          return instituto.id === id;
        }
        busquedaText = busquedaText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log(busquedaText);
        const normalizedName = instituto.nombre_establecimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normalizedName.includes(busquedaText);
      });
      
    }
  }

  setFocus(){
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100)
  }

  normalizeStr(text:string){
    text.toLocaleUpperCase
  }

  abrirRegistro(data: any) {
    const dialog = this.dialog.open(ModalRegistroComponent, {
      data,
      width: '750px',
    });
    dialog.afterClosed().subscribe( result =>{
      if(result){
        this.searchTerm = '';
        this.onSearch();
        this.setFocus();
      }
    });
  }

  crearNuevoRegistro(newName:string = ""){
    const newInstituto:InstitutoConfirmadoDTO = {
      nombre_establecimiento: newName,
      estado_participacion: "SIN_REGISTRO"
    };
    const dialog = this.dialog.open(ModalRegistroComponent, {
      data: newInstituto,
      width: '750px',
    });
    dialog.afterClosed().subscribe( result =>{
      if(result){
        console.log('ejecutando limpieza');
        this.searchTerm = '';
        this.onSearch();
        this.setFocus();
      }
    });
  }
}

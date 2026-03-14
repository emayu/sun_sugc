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
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTabsModule, MatInputModule,
    MatFormFieldModule,
    MatIconModule, MatButtonModule,
    MatTableModule, MatDialogModule,
    ListaRegistradosComponent,
    MatSnackBarModule, MatProgressSpinnerModule
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
  authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  isSync = false;

  ngOnInit(): void {
    this.confirmadosService.getAll()
    .subscribe({ next: response => {
      // console.log(response);
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

  abrirRegistro(data: InstitutoConfirmadoDTO) {
    const dialog = this.dialog.open(ModalRegistroComponent, {
      data: {
        mode: 'CREATE',
        instituto: data
      },
      width: '750px',
    });
    dialog.afterClosed().subscribe( result =>{
      if(result){
        this.searchTerm = '';
        this.onSearch();
      }
      this.setFocus();
    });
  }

  crearNuevoRegistro(newName:string = ""){
    const newInstituto:InstitutoConfirmadoDTO = {
      nombre_establecimiento: newName,
      estado_participacion: "SIN_REGISTRO"
    };CommonModule
    const dialog = this.dialog.open(ModalRegistroComponent, {
      data: {
        mode: 'CREATE',
        instituto: newInstituto
      },
      width: '750px',
    });
    dialog.afterClosed().subscribe( result =>{
      if(result){
        this.searchTerm = '';
        this.onSearch();
      }
      this.setFocus();
    });
  }

  syncRegistros() {
    this.isSync = true;
    this.confirmadosService.sync()
      .pipe(switchMap(syncResponse => this.confirmadosService.getAll()))
      .subscribe({
        next: response => {
          this.confirmadosList =  response;
          this.onSearch();
          this.snackBar.open('✅ Sincronizado! ', 'x', { duration: 3000 });
        },
        error: error => {

        }
      })
      .add( ()=>this.isSync = false);
  }
}

import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService extends AbstractService{

  private readonly BASE_API_URL = "/api/v1/instituciones"
  
    constructor(private  http:HttpClient) {
    super();
   }

   getById(id:number): Observable<any>{
    return this.http.get(`${this.BASE_API_URL}/${id}`)
      .pipe( 
        map( (response:any) => response.data),
        catchError(this.handleError)
      );
   }

   getAllAdmin():Observable<any>{
    return this.http.get(`${this.BASE_API_URL}/all`)
      .pipe(
        map( (response:any) => response.data),
        catchError(this.handleError)
      );
   }

   getAll():Observable<any>{
    return this.http.get(this.BASE_API_URL)
      .pipe(
        map( (response:any) => response.data),
        catchError(this.handleError)
      );
   }

  getHistorial(id: number): Observable<any> {
    return this.http.get(`${this.BASE_API_URL}/${id}/gestiones`)
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }

  createGestionBitacora(data:BitacoraDto){
    return this.http.post(`${this.BASE_API_URL}/${data.id_institucion}/gestiones`, data)
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }

  sendInvitacionEmail(id:number, data:any){
    return this.http.post(`${this.BASE_API_URL}/${id}/send/invitacion`, data)
      .pipe(
        map((response:any) => response.data),
        catchError(this.handleError)
      );
  }
}


export interface BitacoraDto {
    id: number;
    id_institucion: number;
    id_usuario: number;
    fecha_gestion_inicio: Date;
    fecha_gestion_final: Date;
    accion: string, 
    medio_contacto: string;
    id_resultado: number;
    resultado: ResultadoBitacoraDto;
    observaciones: string;
    proxima_llamada: Date;
    usuario:{
      nombre:string;
    }
}

export interface ResultadoBitacoraDto{
    id: number;
    nombre: string;
    tipo: string;
    descripcion?: string;
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
	estado?: EstadoInstitutoDto;
	responsable?: UsuarioDto;
}

export interface EstadoInstitutoDto{
    id: number;
    nombre: string;
    descripcion?: string;
}

export interface UsuarioDto{
	id: number;
	nombre: string;
	email: string;
	rawRoles: string;
}
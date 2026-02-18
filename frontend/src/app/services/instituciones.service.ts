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
}

export interface ResultadoBitacoraDto{
    id: number;
    nombre: string;
    tipo: string;
    descripcion?: string;
}

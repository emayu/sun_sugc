import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroAsistenciaService extends AbstractService {

  private readonly BASE_API_URL = "/api/v1/registro_asistencia"

  constructor(private http: HttpClient) { super(); }

  getAll(fecha_participacion:string = "hoy"): Observable<any> {
    const params = new HttpParams().set('fecha_registro', fecha_participacion);
    return this.http.get(`${this.BASE_API_URL}`, { params })
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }


  createRegistroAsistencia(data:RegistroAsistenciaDTO){
      return this.http.post(`${this.BASE_API_URL}`, data)
        .pipe(
          map((response: any) => response.data),
          catchError(this.handleError)
        );
  }

  updateRegistroAsistencia(id:number, data:RegistroAsistenciaDTO){
      return this.http.put(`${this.BASE_API_URL}/${id}`, data)
        .pipe(
          map((response: any) => response.data),
          catchError(this.handleError)
        );
  }

}


export interface RegistroAsistenciaDTO {
  id: number;
  id_institucion: number | null;
  tipo_registro: string;
  nombre_establecimiento: string;
  tipo_confirmacion: string;
  cantidad_estudiantes: number;
  nombre_encargado?: string;
  tel_encargado?: string;
  correo_encargado?: string;
  correo_principal_institucion?: string;
  tel_principal_institucion?: string;
  salon_asignado: string;
  observaciones?: string | null;
  fecha_registro: Date;
  id_usuario_registro: number;
  usuario?: {
    nombre: string;
  }
}
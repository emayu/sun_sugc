import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmadosService extends AbstractService {

  private readonly BASE_API_URL = "/api/v1/confirmados"

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<any> {
    return this.http.get(this.BASE_API_URL)
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }

}


export interface InstitutoConfirmadoDTO {
  id?: number;
  nombre_establecimiento: string;
  direccion?: string | null;
  departamento?: string;
  municipio?: string;
  estado_participacion: string;
  fecha_participacion?: string | null;
  fecha_text?: string | null;
  hora_participacion?: string | null;
  cantidad_graduandos?: number | null; 
  tiene_responsable?: string | null;
  nombre_responsable?: string | null;
  tel_responsable?: string | null;
  observaciones?: string | null;
}
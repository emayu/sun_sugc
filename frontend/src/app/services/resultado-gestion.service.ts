import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoGestionService extends AbstractService {

  private readonly BASE_API_URL = "/api/v1/resultados_gestion"

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<any> {
    return this.http.get(this.BASE_API_URL)
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }

}

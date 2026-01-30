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


   getAll():Observable<any>{
    return this.http.get(this.BASE_API_URL)
      .pipe(
        map( (response:any) => response.data),
        catchError(this.handleError)
      );
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {

  private readonly BASE_API_URL = "/api/v1"

  constructor(private  http:HttpClient) {
    super();
   }


  login(credentials: any) {
    return this.http.post<any>(`${this.BASE_API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('login result:', response);
          if (response?.status && response.status  === "success") {
            const { token, usuario } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', usuario);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  isLoggedIn(){
    const token = this.getSessionToken();
    if(token){
      return true;
    }
    return false;
  }

  getSessionToken(){
    return localStorage.getItem('token');
  }


}

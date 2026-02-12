import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { AbstractService } from './abstract.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {

  private readonly BASE_API_URL = "/api/v1"

  constructor(private  http:HttpClient, private router:Router) {
    super();
   }


  login(credentials: any) {
    return this.http.post<any>(`${this.BASE_API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          // console.log('login result:', response);
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
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    const token = this.getSessionToken();
    if(token){
      const { exp } = this.getDecodedJWTPayload();
      return exp > (Math.floor( (new Date).getTime() / 1000));
    }
    return false;
  }

  private getDecodedJWTPayload(){
    const token = this.getSessionToken();
    if(token){
      try{
        return JSON.parse(atob(token.split('.')[1]));
      }catch(error){ console.warn('token inválido', token)}
    }
    return {};
  }

  getSessionToken(){
    return localStorage.getItem('token');
  }

  getUserName(){
    return localStorage.getItem('usuario');
  }


}

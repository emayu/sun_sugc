import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export abstract class AbstractService {
    constructor() { }


    handleError(httpError: HttpErrorResponse) {
        let errorMessage = 'Ocurrió un error inesperado';
        if (httpError.status === 401) {
            if(httpError.error?.message === "Token expirado"){
                errorMessage = 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión presionando F5.';    
            }else if(httpError.error?.message === "Credenciales invalidas"){
                errorMessage = 'Credenciales inválidas. Por favor, revisa tu correo y contraseña.';
            }else if(httpError.error?.message){
                errorMessage = httpError.error.message;
            }
        } else if (httpError.status === 403) {
            errorMessage = 'Tu sesión ha expirado o no tienes permisos.';
        } else if (httpError.status === 0) {
            errorMessage = 'No hay conexión con el servidor.';
        }

        return throwError(() => errorMessage);
    }
}
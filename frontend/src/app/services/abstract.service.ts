import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export abstract class AbstractService {
    constructor() { }


    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ocurrió un error inesperado';
        if (error.status === 401) {
            errorMessage = 'Credenciales inválidas. Por favor, revisa tu correo y contraseña.';
        } else if (error.status === 403) {
            errorMessage = 'Tu sesión ha expirado o no tienes permisos.';
        } else if (error.status === 0) {
            errorMessage = 'No hay conexión con el servidor.';
        }

        return throwError(() => errorMessage);
    }
}
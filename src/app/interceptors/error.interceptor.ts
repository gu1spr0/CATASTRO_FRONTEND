import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, ignoreElements } from 'rxjs/operators';
import { ToastMessage } from '../models/generic/ToastMessage';
import { AuthService } from '../services/auth.service';
@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private _auth: AuthService,
        private _toastMessage: ToastMessage
    ){}

    intercept(request: HttpRequest<any>, next: HttpHandler){
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse)=>{
                switch (err.status) {
                    case 400:
                        setTimeout(()=> {
                            this._toastMessage.error(err.error.message)
                        }, 300);
                        break;
                    case 401:
                        setTimeout(()=>{
                            this._toastMessage.error(err.error.message);
                        }, 300);
                        break;
                    case 403:
                        this._auth.logout();
                        this._toastMessage.error('Su sesion ha expirado');
                        break;
                    default:
                        if(typeof err.error === 'string'){
                            if(err.error && err.statusText !== 'Unknown Error'){
                                this._toastMessage.error(JSON.parse(err.error).message);
    
                            }
                        } else if(typeof err.error === 'object'){
                            if (err.error && err.statusText !== 'Unknown Error'){
                                this._toastMessage.error(err.error.message);
    
                            }
                        }
                }
                if(err.statusText === 'Unknown Error') {
                    this._toastMessage.error('Servicio no disponible por el momento');
                }
                const error = err.message || err.error.message;
                return throwError(error);
            })
        );
    }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastMessage } from '../models/generic/ToastMessage';
import { ServeMessage } from '../models/generic/ServeMessage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _auth:AuthService,
    private _router:Router,
    private _toastMessage:ToastMessage
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // --> Don't add Authorization Bearer
    if(this._auth.isLoginUser() && request.url.indexOf('assets') === -1){
      request=request.clone({
        setHeaders:{
          Authorization:`Bearer ${this._auth.getUserToken()}`
        }
      })
    }
    return next.handle(request).pipe(
      map((event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse){
          const handler= new ServeMessage(event,request);
          handler.showMessage(this._toastMessage,this._router);
        }
        return event;
      })
    );
  }
}
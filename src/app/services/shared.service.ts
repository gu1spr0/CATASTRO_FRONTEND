import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastMessage } from '../models/generic/ToastMessage';
import { Observable } from 'rxjs';
import { VarApis } from '../settings/VarApis';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private _http: HttpClient,
    private _toastMessage: ToastMessage
  ) { }

  /*domainValues(domainCode: string): Observable<any>{
    return this._http.get(`${VarApis.URL_DOMAINS}/value/select?domainCode=${domainCode}`);
  }*/

  showMessage(type: 'error' | 'success' | 'warning', message: string): void {
    switch(type) {
      case 'error':
        this._toastMessage.error(message);
        break;
      case 'success':
        this._toastMessage.success(message);
        break;
      case 'warning':
        this._toastMessage.warning(message);
        break;
    }
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastMessage } from '../models/generic/ToastMessage';
import { VarApis } from '../settings/VarApis';
import { Constants } from '../settings/VarConstants';
import { HttpClient } from '@angular/common/http';
import { NotaryQuery } from '../models/notary/NotaryQuery.dto';

@Injectable({
  providedIn: 'root'
})
export class NotaryService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _toastMessage: ToastMessage
  ) {}

  getAllNotary(){
    return this._http.get<NotaryQuery[]>(VarApis.URL_NOTARY, {
      params: {
        state: Constants.STATE_ACTIVE,
      }
    });
  }
}

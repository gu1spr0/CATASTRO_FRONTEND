import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserQuery } from '../models/user/UserQuery.dto';
import { VarApis } from '../settings/VarApis';
import { Constants } from '../settings/VarConstants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private _http: HttpClient
  ) { }

  /*getAllUsers(): Observable<UserQuery[]> {
    return this._http.get<UserQuery[]>(VarApis.URL_USERS, {
      params: {
        state: Constants.STATE_ACTIVE
      }
    });
  }*/
}

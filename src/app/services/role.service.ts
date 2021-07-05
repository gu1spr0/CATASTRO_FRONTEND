import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleQuery } from '../models/role/RoleQuery.dto';
import { VarApis } from '../settings/VarApis';
import { Constants } from '../settings/VarConstants';
import { RoleAdd } from '../models/role/RoleAdd.dto';

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(
    private _http:HttpClient
  ) {}

  getAllRole(): Observable<RoleQuery[]> {
    return this._http.get<RoleQuery[]>(VarApis.ROLES, {
      params: {
        state: Constants.STATE_ACTIVE
      }
    });
  }

  saveRole(pRoleAdd: RoleAdd): Observable<RoleQuery> {
    return this._http.post<RoleQuery>(VarApis.ROLES, pRoleAdd);
  }
}

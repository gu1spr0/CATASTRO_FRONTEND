import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VarApis } from '../settings/VarApis';
import { UpgradeQuery } from './../models/upgrade/UpgradeQuery.dto'
@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor(
    private _http: HttpClient
  ) { }

  async getMejora(pGeocodigo: string): Promise<UpgradeQuery[]> {
    const url = VarApis.URL_UPGRADE+"/"+pGeocodigo;
    return await this._http.get<UpgradeQuery[]>(url).toPromise();
  }
}

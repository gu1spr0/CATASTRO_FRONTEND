import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertyQuery } from '../models/property/PropertyQuery.dto';
import { VarApis } from '../settings/VarApis';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  
  constructor(
    private _http: HttpClient
  ) { }

  async getProperty(pGeocodigo: string): Promise<PropertyQuery> {
    const url = VarApis.URL_PROPERTY+"/"+pGeocodigo;
    return await this._http.get<PropertyQuery>(url).toPromise();
  }
}

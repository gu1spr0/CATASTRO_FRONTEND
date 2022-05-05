import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyQuery } from '../models/property/PropertyQuery.dto';
import { VarApis } from '../settings/VarApis';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private _http: HttpClient
  ) { }

  getProperty(pGeocodigo: string): Observable<PropertyQuery> {
    const url = VarApis.URL_PROPERTY+"/"+pGeocodigo;
    console.log(url);
    return this._http.get<PropertyQuery>(VarApis.URL_PROPERTY+"/"+pGeocodigo);
  }
}

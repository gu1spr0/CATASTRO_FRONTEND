import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RepoQuery } from "../models/repo/RepoQuery.dto";
import { Constants } from "../util/Constants";
import { RepoAdd } from "../models/repo/RepoAdd.dto";
import { Router } from '@angular/router';
import { ToastMessage } from '../models/generic/ToastMessage';
import { VarApis } from '../settings/VarApis';
@Injectable({
  providedIn: "root"
})
export class RepoService {
  constructor(
    private _http: HttpClient,
  ) {}

  getAllRepository(): Observable<RepoQuery[]> {
    return this._http.get<RepoQuery[]>(VarApis.REPOSITORY, {
      params: {
        state: Constants.STATE_ACTIVE
      }
    });
  }

  saveRepository(pRepoAdd: RepoAdd): Observable<RepoQuery> {
    return this._http.post<RepoQuery>(VarApis.REPOSITORY, pRepoAdd);
  }
}

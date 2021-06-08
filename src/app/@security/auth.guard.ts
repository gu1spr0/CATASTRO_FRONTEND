import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { VarRouterPage } from '../settings/VarRouterPage';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(
        private _auth: AuthService,
        private _router: Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._auth.isLoginUser()) {
          return true;
        } else {
          this._router.navigate([VarRouterPage.LOGIN])
          return false;
        }
      }

      canActivateChild(route: any, state?: RouterStateSnapshot): boolean {
        return this.getValidPath(route);
      }

      getValidPath(uri: any): boolean {
        let recursos: any
        var invalid = true;
        recursos = this._auth.getResources();
        if(uri._routerState.url!=='/notary'){
          for (let indexMenu = 0; indexMenu < recursos.length; indexMenu++) {
            if (invalid) {
              const routes = recursos[indexMenu]['resourceLoginQueryDtoList']
              for (let indexSubMenu = 0; indexSubMenu < routes.length; indexSubMenu++) {
                if (uri._routerState.url.indexOf(routes[indexSubMenu].route) >= 0) {
                  invalid = false
                }
              }
            }
          }
        }else{
          invalid=false;
        }
       
        if (!invalid) {
          return true;
        } else {
          return false;
        }
      }
}
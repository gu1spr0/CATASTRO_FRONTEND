import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ToastMessage} from '../models/generic/ToastMessage'
import { VarRouterPage } from '../settings/VarRouterPage';
import { VarLocalStorage } from '../settings/VarLocalStorage';
import { VarApis } from '../settings/VarApis';
import { Signin } from '../models/user/Signin.dto';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _toastMessage: ToastMessage
    
  ) { }

  login(pSignin: Signin){
    this._http.post(VarApis.URL_LOGIN, pSignin).subscribe(response => {
      this.sessionStart(response);
      setTimeout(()=>{
        this._toastMessage.success("Bienvenido: "+ response.name);
        //console.log(response.name);
      }, 300);
    })
  }

  logout() {
    localStorage.clear();
    this._router.navigate([VarRouterPage.LOGIN]);
  }

  isLoginUser(): boolean{
    return !!localStorage.getItem(VarLocalStorage.TOKEN);
  }

  getUserToken(){
    return localStorage.getItem(VarLocalStorage.TOKEN);
  }

  getUsername(){
    return localStorage.getItem(VarLocalStorage.USER_NAME);
  }

  getDataProfile():any{
    return localStorage.getItem(VarLocalStorage.USER_PROFILE);
  }

  getDataPermission(){
    return localStorage.getItem(VarLocalStorage.PERMISSIONS);
  }

  getResources() {
    if(this.isLoginUser()){
      return localStorage.getItem(VarLocalStorage.PERMISSIONS);
    }else{
      return [];
    }
  }

  sessionStart(data: any){
    localStorage.setItem(VarLocalStorage.TOKEN, data.token);
    localStorage.setItem(VarLocalStorage.USER_NAME, data['user']['username']);
    localStorage.setItem(VarLocalStorage.USER_PROFILE,JSON.stringify({userName:data['user']['username'],name:data['name'],email:data['email'],phone:data['phone']}));
    localStorage.setItem(VarLocalStorage.RESOURCE, JSON.stringify(data['resources']));
    localStorage.setItem(VarLocalStorage.PERMISSIONS, JSON.stringify(data['permissions']));
    this._router.navigate([VarRouterPage.PRINCIPAL]);
  }
}

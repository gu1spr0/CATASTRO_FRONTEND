import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ToastMessage {
    constructor(
        //private _toastr: ToastrService
    ) { }
    public success(message: string): void {
        //this._toastr.success(message, 'Correcto');
        console.log('Correcto');
    }
    public warning(message: string): void {
        //this._toastr.warning(message, 'Precaución');
        console.log('Precaución');
    }
    public error(message: string): void {
        //this._toastr.error(message, 'Error');
        console.log('Servicio no disponible');
    }
}
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export class ServeMessage {
    protected eventResponse: HttpResponse<any>;
    protected request: HttpRequest<any>;

    constructor(event: HttpResponse<any>, request: HttpRequest<any>) {
        this.eventResponse = event;
        this.request = request;
    }

    showMessage(toast: any, router: Router){
        const method = this.request.method, url = router.url;
        switch(this.eventResponse.status){
            case 200:
                if(method === 'PUT'){
                    toast.success("Se actualizo correctamente");
                }
                break;
            
            case 201:
                toast.success("Se registro correctamente");
                break;
            
            case 204:
                toast.success("Se elimino el registro");
                break;
        }
    }
}
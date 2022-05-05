import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from '../@security/login.guard';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { VisorComponent } from "./visor/visor.component";

const pagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        canActivate: [LoginGuard],
        component: LoginComponent
    },
    {
        path: '',
        component: PagesComponent,

        children: [
            {
                path: 'visor',
                component: VisorComponent,
                data: {
                    titulo: 'Visor'
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
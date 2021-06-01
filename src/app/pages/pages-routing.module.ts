import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from '../@security/login.guard';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { NotaryComponent } from './notary/notary.component';
import { RepositoryComponent } from './repository/repository.component';
import { NgModule } from '@angular/core';

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
                path: 'notary',
                component: NotaryComponent,
                data: {
                    titulo: 'Notaria'
                }
            },
            {
                path: 'repository',
                component: RepositoryComponent,
                data:{
                    titulo: 'Repositorio'
                }
            },
            {
                path: 'document',
                component: RepositoryComponent,
                data:{
                    titulo: 'Documento'
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
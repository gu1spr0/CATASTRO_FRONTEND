import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from '../@security/login.guard';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { NotaryComponent } from './notary/notary.component';
import { RepositoryComponent } from './repository/repository.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { DomainComponent } from './domain/domain.component';
import { DocumentComponent } from './document/document.component';

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
                component: DocumentComponent,
                data:{
                    titulo: 'Documento'
                }
            },
            {
                path: 'user',
                component: UserComponent,
                data: {
                    titulo: 'Usuario'
                }
            },
            {
                path: 'role',
                component: RoleComponent,
                data: {
                    titulo: 'Roles'
                }
            },
            {
                path: 'domain',
                component: DomainComponent,
                data: {
                    titulo: 'Dominios'
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
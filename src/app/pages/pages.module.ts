import { NgModule } from "@angular/core";
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

import { CardModule } from "primeng-lts/card";
import { ButtonModule } from "primeng-lts/button";
import { PanelMenuModule } from "primeng-lts/panelmenu";
import { TabViewModule } from "primeng-lts/tabview";
import { TableModule } from "primeng-lts/table";
import { DialogModule } from "primeng-lts/dialog";
import { InputTextModule } from "primeng-lts/inputtext";
import { PanelModule } from "primeng-lts/panel";
import { DropdownModule } from "primeng-lts/dropdown";
import { InputTextareaModule } from "primeng-lts/inputtextarea";
import { FileUploadModule } from "primeng-lts/fileupload";
import { VisorComponent } from "./visor/visor.component";
import { OlMapsModule } from "../@components-app/map-template/ol-maps.module";


@NgModule({
    declarations: [
        PagesComponent,
        VisorComponent,
        LoginComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PagesRoutingModule,
        SharedModule,
        CardModule,
        ButtonModule,
        PanelMenuModule,
        TabViewModule,
        TableModule,
        DialogModule,
        InputTextModule,
        PanelModule,
        DropdownModule,
        InputTextareaModule,
        FileUploadModule,
        OlMapsModule
    ]
})
export class PagesModule {}
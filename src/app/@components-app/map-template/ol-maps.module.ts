import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OlMapComponent } from "./ol-map.component";

const COMPONENTS = [
    OlMapComponent
];

@NgModule({
    declarations: COMPONENTS,
    exports: COMPONENTS,
    imports: [
        CommonModule
    ]
})
export class OlMapsModule{}
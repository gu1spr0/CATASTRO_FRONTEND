import { Geometry } from "ol/geom";

export class PropertyQuery {
    id: number;
    geometry:Geometry;
    objectId?:number;
    joinCount:number;
    targetFid:number;
    referencia:string;
    estGabine:number;
    referenc1: string;
    contador: string;
    geocodigo: string;
    shapeLeng: number;
    shapeArea: number;
    ngrilla: number;
  }
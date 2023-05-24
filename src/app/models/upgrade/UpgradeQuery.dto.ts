import { Geometry } from "ol/geom";

export class UpgradeQuery {
    id: number;
    geometry:Geometry;
    objectId?:number;
    referencia: string;
    mejora: string;
    observacion: string;
    geocodigo: string;
    shapeLeng: number;
    shapeArea: number;
  }
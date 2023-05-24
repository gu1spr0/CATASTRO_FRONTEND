import { Geometry } from "ol/geom";
import { UpgradePropertiesQuery } from "../upgrade/UpgradePropertiesQuery.dto";

export class Feature {
    type: string = "Feature";
    properties: UpgradePropertiesQuery;
    geometry: Geometry;
  }
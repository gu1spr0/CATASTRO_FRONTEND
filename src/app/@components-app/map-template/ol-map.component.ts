import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  Output,
  Attribute,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ChangeDetectionStrategy,
} from "@angular/core";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import Map from "ol/Map";
import View from "ol/View";
import LayerGroup from "ol/layer/Group";
import LayerTile from "ol/layer/Tile";
import SourceOSM from "ol/source/OSM";
import { BingMaps, XYZ, Vector as VectorSource } from "ol/source";
import LayerSwitcher from "ol-layerswitcher";
import { BaseLayerOptions, GroupLayerOptions } from "ol-layerswitcher";
import { TileWMS } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import * as Proj from "ol/proj";
import { Fill, Stroke, Style, Text } from "ol/style";
import {
  defaults as defaultControls,
  ScaleLine,
  FullScreen,
  MousePosition,
  OverviewMap,
  ZoomSlider,
  ZoomToExtent,
  Attribution,
  Zoom,
} from "ol/control";
import { Layer, Vector as VectorLayer } from "ol/layer";
import { Features } from "src/app/models/map/Features.dto";
import { VarApis } from "src/app/settings/VarApis";
export const DEFAULT_HEIGHT = "500px";
export const DEFAULT_WIDTH = "500px";

export const DEFAULT_LAT = -68.3032471017309;
export const DEFAULT_LON = -58.382037891217465;

@Component({
  selector: "app-ol-map",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./ol-map.component.html",
  styleUrls: ["./ol-map.component.css"],
})
export class OlMapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;
  @Input() featuresPredio: Features = new Features();
  @Input() featuresMejora: Features = new Features();

  data: any;
  //Capas Base
  private LayerOSM: any;
  private LayerBing: any;
  private LayerGoogleSatelite: any;
  private LayerGoogle: any;

  //Capas WMS
  private LayerManzanas: any;
  private LayerPredios: any;
  private LayerGrilla: any;
  private LayerMejoras: any;

  //Capa vectorial
  public LayerVectorialPredio: any;
  public LayerVectorialMejora: any;
  public map: Map;
  private mapEl: HTMLElement;

  public currentFeature: any;

  constructor(private elementRef: ElementRef) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(!(changes.featuresPredio.firstChange && changes.featuresMejora.firstChange)){
      this.findProperty();
    }
  }
  ngAfterViewInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector("#map");

    //CAPA BASE
    this.LayerOSM = new LayerTile({
      title: "OSM",
      //type: "base",
      visible: false,
      source: new SourceOSM(),
    } as BaseLayerOptions);
    this.LayerBing = new LayerTile({
      title: "Bing Map",
      //type: "base",
      visible: false,
      source: new BingMaps({
        key: "AnSERau4L-wtJSyhhTX8E7WmVMOft_yhaeAvftc9Vjo-ijbhH59sJmDeHa_aMS8v",
        imagerySet: "Aerial",
        maxZoom: 22,
      }),
    } as BaseLayerOptions);
    this.LayerGoogleSatelite = new LayerTile({
      title: "Google Satelite",
      //type: "base",
      visible: false,
      source: new XYZ({
        url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
      }),
    } as BaseLayerOptions);
    this.LayerGoogle = new LayerTile({
      title: "Google",
      //type: "base",
      visible: false,
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
      }),
    } as BaseLayerOptions);
    const LayersBase = new LayerGroup({
      title: "Capas base",
      layers: [
        this.LayerOSM,
        this.LayerBing,
        this.LayerGoogleSatelite,
        this.LayerGoogle,
      ],
    } as GroupLayerOptions);

    //ADQUIERE SERVICIOS DE GEOSERVER: PREDIOS Y MANZANAS
    this.LayerManzanas = new LayerTile({
      title: "Manzanas",
      visible: false,
      source: new TileWMS({
        url: VarApis.GEO_API,
        params: {
          VERSION: "1.1.1",
          FORMAT: "image/png",
          TRANSPARENT: true,
          LAYERS: "catastro_v:v_Manzanas",
        },
      }),
    } as GroupLayerOptions);
    this.LayerPredios = new LayerTile({
      title: "Predios",
      visible: true,
      source: new TileWMS({
        url: VarApis.GEO_API,
        params: {
          VERSION: "1.1.1",
          FORMAT: "image/png",
          TRANSPARENT: true,
          LAYERS: "catastro_v:v_Predios",
        },
      }),
    } as GroupLayerOptions);
    this.LayerGrilla = new LayerTile({
      title: "Grilla",
      visible: false,
      source: new TileWMS({
        url: VarApis.GEO_API,
        params: {
          VERSION: "1.1.1",
          FORMAT: "image/png",
          TRANSPARENT: true,
          LAYERS: "catastro_v:v_Cuadricula",
        },
      }),
    } as GroupLayerOptions);
    this.LayerMejoras = new LayerTile({
      title: "Mejoras",
      visible: false,
      source: new TileWMS({
        url: VarApis.GEO_API,
        params: {
          VERSION: "1.1.1",
          FORMAT: "image/png",
          TRANSPARENT: true,
          LAYERS: "catastro_v:v_Mejoras",
        },
      }),
    } as GroupLayerOptions);

    const LayerStylePredio = new Style({
      stroke: new Stroke({
        color: "rgba(165,42,42,0.7)",
        width: 5,
        lineDash: [8,8]
      }),
    });
    const LayerStyleMejora = new Style({
      fill: new Fill({
        color: "rgbA(0,50,200,0.7)",
      }),
      text: new Text({
        text: '',
        scale: 1.5,
        fill: new Fill({
          color: '#000000'
        }),
        stroke: new Stroke({
          color: 'rgb(255,100,0)',
          width: 3
        })
      })
    });

    this.LayerVectorialPredio = new VectorLayer({
      source: new VectorSource({}),
      zIndex: 500,
      style: LayerStylePredio,
      maxZoom: 23
    });
    this.LayerVectorialMejora = new VectorLayer({
      source: new VectorSource({}),
      maxZoom: 23,
      zIndex: 700,
      style: function(feature: any) {
        LayerStyleMejora.getText().setText(feature.values_.name);
        //LayerStyleMejora.getText().setFont(20 + 'px sans-serif',)
        return LayerStyleMejora;
    },
    });

    const LayersWork = new LayerGroup({
      title: "Capas de Trabajo",
      layers: [
        this.LayerMejoras,
        this.LayerGrilla,
        this.LayerManzanas,
        this.LayerPredios,
      ],
    } as GroupLayerOptions);

    const LayerView = new View({
      center: Proj.fromLonLat([this.lon, this.lat]),
      zoom: this.zoom,
      maxZoom: 21,
      minZoom: 3,
    });

    this.map = new Map({
      target: "map",
      layers: [
        LayersBase,
        LayersWork,
        this.LayerVectorialPredio,
        this.LayerVectorialMejora,
      ],
      view: LayerView,
      controls: defaultControls({ attribution: true, zoom: false }).extend([
        new FullScreen(),
        new ScaleLine(),
        new Zoom(),
        new LayerSwitcher({
          reverse: true,
          groupSelectStyle: "group",
        }),
        new MousePosition({
          projection: "EPSG:4326",
        }),
      ]),
    });
  }
  findProperty() {
      const format = new GeoJSON({
        featureProjection: "EPSG:3857",
      });
      this.LayerVectorialPredio.getSource().clear();
      this.LayerVectorialMejora.getSource().clear();
      this.LayerVectorialPredio.getSource().addFeatures(
        format.readFeatures(this.featuresPredio)
      );
      this.LayerVectorialMejora.getSource().addFeatures(
        format.readFeatures(this.featuresMejora)
      );
      var ext = this.LayerVectorialPredio.getSource().getExtent();
      this.map.getView().fit(ext); 
  }
}

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
} from "@angular/core";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import domtoimage from 'dom-to-image';
import Map from "ol/Map";
import View from "ol/View";
import LayerGroup from "ol/layer/Group";
import LayerTile from "ol/layer/Tile";
import SourceOSM from "ol/source/OSM";
import { BingMaps, XYZ, Vector as VectorSource } from "ol/source";
import SourceStamen from "ol/source/Stamen";
import LayerSwitcher from "ol-layerswitcher";
import { BaseLayerOptions, GroupLayerOptions } from "ol-layerswitcher";
import { TileWMS } from "ol/source";
import GeoJSON, { GeoJSONFeature } from "ol/format/GeoJSON";
import * as Proj from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";
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
import { Vector as VectorLayer } from "ol/layer";
import { Geometry } from "ol/geom";

export const DEFAULT_HEIGHT = "500px";
export const DEFAULT_WIDTH = "500px";

export const DEFAULT_LAT = -68.3032471017309;
export const DEFAULT_LON = -58.382037891217465;

@Component({
  selector: "app-ol-map",
  templateUrl: "./ol-map.component.html",
  styleUrls: ["./ol-map.component.css"],
})
export class OlMapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;
  @Input() geometry: Geometry;
  //Capas Base
  private LayerOSM: any;
  private LayerBing: any;
  private LayerGoogleSatelite: any;
  private LayerGoogle: any;

  //Capas WMS
  private LayerManzanas: any;
  private LayerPredios: any;

  //Capa vectorial
  public LayerVectorial: any;
  public map: Map;

  private mapEl: HTMLElement;

  constructor(private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    //this.findProperty(changes.geometry.currentValue);
    if(changes.geometry.currentValue){
      this.findProperty(changes.geometry.currentValue);

    } 
  }

  descargar(){
    /*this.map.once('rendercomplete', function() {
      var exportOptions = {
        filter: function(element) {
          var className = element.className || '';
          return (
            className.indexOf('ol-control') === -1 ||
            className.indexOf('ol-legend') > -1 ||
            (className.indexOf('ol-attribution') > -1 &&
              className.indexOf('ol-uncollapsible'))
          );
        },
      };

      domtoimage.toJpeg(this.map.getTargetElement(), exportOptions)
        .then(function(dataURL) {
          var link = document.getElementById('boton');
          link.href = dataURL;
          link.click();
        });
    });
    this.map.renderSync();*/
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector("#map");
    //this.setSize();

    const SourcePredios = new TileWMS({
      url: "http://188.166.127.18:8080/geoserver/wms?",
      params: {
        VERSION: "1.1.1",
        FORMAT: "image/png",
        TRANSPARENT: true,
        LAYERS: "catastro_v:v_Predios",
        TILED: true,
      },
      serverType: "geoserver",
      crossOrigin: "anonymous",
    });

    //CAPA BASE
    this.LayerOSM = new LayerTile({
      title: "OSM",
      type: "base",
      visible: false,
      source: new SourceOSM(),
    } as BaseLayerOptions);

    this.LayerBing = new LayerTile({
      title: "Bing Map",
      type: "base",
      visible: false,
      source: new BingMaps({
        key: "AnSERau4L-wtJSyhhTX8E7WmVMOft_yhaeAvftc9Vjo-ijbhH59sJmDeHa_aMS8v",
        imagerySet: "Aerial",
        maxZoom: 20,
      }),
    } as BaseLayerOptions);

    this.LayerGoogleSatelite = new LayerTile({
      title: "Google Satelite",
      type: "base",
      visible: false,
      source: new XYZ({
        url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
      }),
    } as BaseLayerOptions);

    this.LayerGoogle = new LayerTile({
      title: "Google",
      type: "base",
      visible: true,
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
      }),
    } as BaseLayerOptions);

    const LayersBase = new LayerGroup({
      title: "Mapas base",
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
        url: "http://188.166.127.18:8080/geoserver/wms?",
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
        url: "http://188.166.127.18:8080/geoserver/wms?",
        params: {
          VERSION: "1.1.1",
          FORMAT: "image/png",
          TRANSPARENT: true,
          LAYERS: "catastro_v:v_Predios",
        },
      }),
    } as GroupLayerOptions);

    const LayersWork = new LayerGroup({
      title: "Mapas de Trabajo",
      layers: [this.LayerManzanas, this.LayerPredios],
    } as GroupLayerOptions);

    const LayerView = new View({
      center: Proj.fromLonLat([this.lon, this.lat]),
      zoom: this.zoom,
      maxZoom: 19,
      minZoom: 3,
    });
    /*const geojsonObject = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            color: "rgb(150,247,76)",
            fillColor: "rgb(200,64,186)",
            popup: "Punto",
          },
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [-68.3032471017309, -16.661717816464517, 3845.409700000004],
                  [-68.30325453527048, -16.66173620927432, 3845.407999999996],
                  [-68.303335402545, -16.661704570581893, 3845.333400000003],
                  [-68.30340519626161, -16.661677263331956, 3845.2690000000002],
                  [-68.30339671015867, -16.661654055379064, 3845.368000000002],
                  [-68.30339546217158, -16.661650643375193, 3845.382500000007],
                  [-68.30335838945786, -16.66154925892373, 3845.8148999999976],
                  [-68.30334110781098, -16.661509068232988, 3845.5060999999987],
                  [-68.30318646796633, -16.661567790143728, 3845.424100000004],
                  [-68.3032187282547, -16.661647614217877, 3845.4165000000066],
                  [-68.30322616736647, -16.661666020606287, 3845.414699999994],
                  [-68.30323955758678, -16.661699151200256, 3845.411500000002],
                  [-68.3032471017309, -16.661717816464517, 3845.409700000004]
                ]
              ]
            ]
          }
        }
      ]
    };*/

    const LayerStyle = new Style({
      stroke: new Stroke({
        color: "rgb(0,27,145)",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(0,27,145,0.7)",
      }),
    });

    this.LayerVectorial = new VectorLayer({
      source: new VectorSource({}),
      zIndex: 500,
      style: LayerStyle
    });

    this.map = new Map({
      target: "map",
      layers: [LayersBase, LayersWork, this.LayerVectorial],
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

    


    /*
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject, {
        featureProjection: "EPSG:3857"
      }),
    });

    this.LayerVectorial = new VectorLayer({
      source: vectorSource,
      style: LayerStyle,
      zIndex: 500,
    });

    var ext = this.LayerVectorial.getSource().getExtent();
    this.map.addLayer(this.LayerVectorial);
    this.map.getView().fit(ext);*/


    /*this.map.on("singleclick", function (evt) {
      document.getElementById("info").innerHTML = "";
      const viewResolution = LayerView.getResolution();
      const url = SourcePredios.getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        "EPSG:3857",
        {
          INFO_FORMAT: "application/json",
        }
      );
      if (url) {
        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            document.getElementById("info").innerHTML = html;
          });
      }
    });*/

  }
  
  findProperty(geometry: Geometry){
    /*const LayerStyle = new Style({
      stroke: new Stroke({
        color: "rgb(0,27,145)",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(0,27,145,0.7)",
      }),
    });*/

    const predio = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            color: "rgb(150,247,76)",
            fillColor: "rgb(200,64,186)",
            popup: "Punto",
          },
          geometry: geometry
        }
      ]
    }

    var format = new GeoJSON({
      featureProjection: "EPSG:3857"
    });

    /*const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(predio, {
        featureProjection: "EPSG:3857"
      }),
    });*/

    /*const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: LayerStyle,
      zIndex: 500,
    });*/
    this.LayerVectorial.getSource().clear();
    this.LayerVectorial.getSource().addFeatures(format.readFeatures(predio))
    var ext = this.LayerVectorial.getSource().getExtent();
    this.map.getView().fit(ext);
    /*var ext = vectorLayer.getSource().getExtent();
    this.map.addLayer(vectorLayer);
    this.map.getView().fit(ext);*/
  }

  //private setSize(): void {
  //  if (this.mapEl) {
  //    const styles = this.mapEl.style;
  //    styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
  //    styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
  //  }
  //}
}

//const cssUnitsPattern = /([A-Za-z%]+)$/;
//function coerceCssPixelValue(value: any): string {
//  if (value == null) {
//    return "";
//  }
//  return cssUnitsPattern.test(value) ? value : `${value}px`;
//}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Feature } from 'src/app/models/map/Feature.dto';
import { Features } from 'src/app/models/map/Features.dto';
import { PropertyQuery } from 'src/app/models/property/PropertyQuery.dto';
import { UpgradePropertiesQuery } from 'src/app/models/upgrade/UpgradePropertiesQuery.dto';
import { UpgradeQuery } from 'src/app/models/upgrade/UpgradeQuery.dto';
import { PropertyService } from 'src/app/services/property.service';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit {

  public info=false;
  public vPropertyQuery: PropertyQuery;
  public vUpgradeQuery: UpgradeQuery;
  public vUpgradeQueryList: UpgradeQuery[];
  vSearchForm: FormGroup;
  vFeature: Feature = new Feature();
  vFeaturesPredio: Features = new Features();
  vFeaturesMejora: Features = new Features();

  constructor(
    private _propertyService: PropertyService,
    private _mejoraService: UpgradeService,
    private formBuilder: FormBuilder
  ){}
  ngOnInit(): void {
    this.vSearchForm = this.formBuilder.group({
      geocodigo: new FormControl('', Validators.required)
    });
  }
  async onSubmit(value){
    if(value){
      await this.getProperty(value.geocodigo);
      if(this.vPropertyQuery){
        await this.getMejora(value.geocodigo);
        this.getGeometry(this.vPropertyQuery, this.vUpgradeQueryList); 
      }
    }
  }
  validForm(){
    if(this.vSearchForm.valid){
      return true;
    } else {
      return false;
    }
  }
  cleanField(){
    this.vSearchForm.reset();
  }
  async getProperty(pGeocodigo: string){
    await this._propertyService.getProperty(pGeocodigo)
      .then((property: PropertyQuery) => {
        this.vPropertyQuery = new PropertyQuery();
        this.vPropertyQuery = property;
        this.cleanField();
        this.info = true;
      })
      .catch(console.error);
  }
  async getMejora(pGeocodigo: string) {
    await this._mejoraService.getMejora(pGeocodigo)
      .then((mejora: UpgradeQuery[]) => {
        this.vUpgradeQueryList = [];
        mejora.forEach((item: UpgradeQuery) => {
          this.vUpgradeQuery = new UpgradeQuery();
          this.vUpgradeQuery = item;
          this.vUpgradeQueryList.push(this.vUpgradeQuery);
        })
      })
      .catch(console.error);
  }
  getGeometry(pPropertyQuery: PropertyQuery,
              pUpgradeQueryList: UpgradeQuery[]){
    this.vFeaturesPredio = new Features();
    this.vFeature = new Feature();
    this.vFeature.geometry = pPropertyQuery.geometry;
    this.vFeaturesPredio.features.push(this.vFeature)

    if(pUpgradeQueryList.length > 0){
      this.vFeaturesMejora = new Features();
      pUpgradeQueryList.forEach((value: UpgradeQuery) => {
        this.vFeature = new Feature();
        this.vFeature.geometry = value.geometry;
        this.vFeature.properties = new UpgradePropertiesQuery;
        this.vFeature.properties.name = value.id.toString();
        this.vFeaturesMejora.features.push(this.vFeature);
      });
    }
    /*this.vFeatures = new Features();
    this.vFeature.geometry = pPropertyQuery.geometry;
    this.vFeatures.features.push(this.vFeature);
    if(pUpgradeQueryList.length > 0){
      pUpgradeQueryList.forEach((value) => {
        this.vFeature = new Feature();
        this.vFeature.geometry = value.geometry
        this.vFeatures.features.push(this.vFeature);
      })
    }*/

  }
}
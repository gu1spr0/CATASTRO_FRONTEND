import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { PropertyQuery } from 'src/app/models/property/PropertyQuery.dto';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit {

  public info=false;
  vPropertyQuery: PropertyQuery;
  vSearchForm: FormGroup;
  vGeometry: Geometry;
  constructor(
    private _propertyService: PropertyService,
    private formBuilder: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.vSearchForm = this.formBuilder.group({
      geocodigo: new FormControl('', Validators.required)
    });
  }

  onSubmit(value){
    console.log(value.geocodigo);
    if(value){
      this.getProperty(value.geocodigo);
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

  getProperty(pGeocodigo: string){
    this._propertyService.getProperty(pGeocodigo).subscribe(
      res => {
        this.vPropertyQuery = res;
        this.vGeometry = this.vPropertyQuery.geometry;
        this.cleanField();
        this.info = true;
      },
      error => {
        console.log(JSON.stringify(error.error.message));
      }
    )
  }
}
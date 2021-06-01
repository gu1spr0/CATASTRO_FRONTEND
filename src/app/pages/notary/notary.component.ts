import { Component, OnInit } from '@angular/core';
import { NotaryQuery } from '../../models/notary/NotaryQuery.dto';
import { NotaryAdd } from '../../models/notary/NotaryAdd.dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotaryService } from '../../services/notary.service';
import { FilterUtils } from 'primeng-lts/api';
@Component({
  selector: 'app-notary',
  templateUrl: './notary.component.html',
  styleUrls: ['./notary.component.css']
})
export class NotaryComponent implements OnInit {
  vNotaryQueryDtoList: NotaryQuery[];
  vNotaryQuery: NotaryQuery;
  vNotaryAdd: NotaryAdd;
  vSelectedElement = true;
  vColumns: any[];
  vNotaryForm: FormGroup;
  vOperation: true;
  constructor(
    private notaryService: NotaryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllNotary();

    this.vNotaryForm = this.formBuilder.group({
      nro: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required)
    });

    this.vColumns = [
      { field: 'nro', header: 'NRO' },
      { field: 'address', header: 'DIRECCION' },
      { field: 'cellphone', header: 'CELULAR' },
      { field: 'telephone', header: 'TELEFONO' },
      { field: 'state', header: 'ESTADO' },
    ];
    FilterUtils['custom'] = (value:any, filter:any): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return parseInt(filter) > value;
    };

  }

  onSubmit(pNotaryAdd: NotaryAdd) {
    console.warn(pNotaryAdd);
  }

  getAllNotary() {
    this.notaryService.getAllNotary().subscribe(
      res => {
        this.vNotaryQueryDtoList = res;
        console.log(this.vNotaryQueryDtoList);
      },
      error => {
        console.log(JSON.stringify(error.error.message));
      }
    );
  }

  cleanField() {
    this.vNotaryForm.reset();
  }

  validForm() {
    if (this.vNotaryForm.valid || this.vSelectedElement) {
      return true;
    } else {
      return false;
    }
  }

}

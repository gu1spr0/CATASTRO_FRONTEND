import { Component, OnInit } from '@angular/core';
import { RoleQuery } from '../../models/role/RoleQuery.dto';
import { RoleAdd } from '../../models/role/RoleAdd.dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { FilterUtils } from 'primeng-lts/api';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  vRoleQueryDtoList: RoleQuery[];
  vRoleQuery: RoleQuery;
  vRoleAdd: RoleAdd;
  vSelectedElement = true;
  vColumns: any[];
  vRoleForm: FormGroup;
  vOperation: true;
  constructor(
    private _roleService: RoleService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllRole();

    this.vRoleForm = this.formBuilder.group({
      role: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.vColumns = [
      { field: 'role', header: 'ROL' },
      { field: 'description', header: 'DESCRIPCION' },
    ];
    FilterUtils['custom'] = (value: any, filter: any): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return parseInt(filter) > value;
    };

  }

  onSubmit(pRoleAdd: RoleAdd) {
    console.warn(pRoleAdd);
  }

  getAllRole() {
    this._roleService.getAllRole().subscribe(
      res => {
        this.vRoleQueryDtoList = res;
      },
      error => {
        console.log(JSON.stringify(error.error.message));
      }
    );
  }

  cleanField() {
    this.vRoleForm.reset();
  }

  validForm() {
    if (this.vRoleForm.valid || this.vSelectedElement) {
      return true;
    } else {
      return false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { UserQuery } from '../../models/user/UserQuery.dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FilterUtils } from 'primeng-lts/api';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  vUserQueryDtoList: UserQuery[];
  vUserQuery: UserQuery;
  vSelectedElement = true;
  vColumns: any[];
  vUserForm: FormGroup;
  vOperation: true;
  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllUser();

    this.vUserForm = this.formBuilder.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      lastname2: new FormControl("", Validators.required),
      ci: new FormControl("", Validators.required),
      exp: new FormControl("", Validators.required),
      cellphone: new FormControl("", Validators.required),
      notary: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required)
    });

    this.vColumns = [
      { field: "username", header: "USUARIO" },
      { field: "name", header: "NOMBRE" },
      { field: "lastname", header: "PATERNO" },
      { field: "lastname2", header: "MATERNO" },
      { field: "ci", header: "CEDULA" },
      { field: "cellphone", header: "CELULAR" }
    ];
    FilterUtils["custom"] = (value: any, filter: any): boolean => {
      if (filter === undefined || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return parseInt(filter) > value;
    };
  }

  getAllUser() {
    this._userService.getAllUsers().subscribe(
      res => {
        this.vUserQueryDtoList = res;
      },
      error => {
        console.log(JSON.stringify(error.error.message));
      }
    );
  }

  cleanField() {
    this.vUserForm.reset();
  }

  validForm() {
    if (this.vUserForm.valid || this.vSelectedElement) {
      return true;
    } else {
      return false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { RepoQuery } from '../../models/repo/RepoQuery.dto';
import { RepoAdd } from '../../models/repo/RepoAdd.dto';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { RepoService } from "../../services/repo.service";
import { FilterUtils, MessageService } from "primeng-lts/api";
import { NotaryService } from "../../services/notary.service";
import { Item } from "../../models/generic/Item.dto";
import { NotaryQuery } from "../../models/notary/NotaryQuery.dto";

@Component({
  selector: "app-repository",
  templateUrl: "./repository.component.html",
  styleUrls: ["./repository.component.css"]
})
export class RepositoryComponent implements OnInit {
  vNotaryQueryDtoList: NotaryQuery[];
  vItemDtoList: Item[];
  vItemDto: Item;
  vRepoQueryDtoList: RepoQuery[];
  vRepoQueryDto: RepoQuery;
  vRepoAddDto: RepoAdd;
  vSelectedElement = true;
  vColumns: any[];
  vRepositoryForm: FormGroup;
  vOperation: true;
  constructor(
    private repoService: RepoService,
    private notaryService: NotaryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadAllNotary();
    this.loadAllRepository();
    this.vRepositoryForm = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      notaryId: new FormControl("", Validators.required)
    });

    this.vColumns = [
      { field: "name", header: "NOMBRE" },
      { field: "description", header: "DESCRIPCION" },
      { field: "notaryId", header: "NOTARIA" }
    ];
    FilterUtils["custom"] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return parseInt(filter) > value;
    };
  }

  onSubmit(pRepositoryAdd: RepoAdd) {
    this.addRepository(pRepositoryAdd);
  }

  loadAllNotary() {
    this.notaryService.getAllNotary().subscribe(
      res => {
        this.vNotaryQueryDtoList = res;
        this.vItemDtoList = Array<Item>();
        this.vNotaryQueryDtoList.forEach(
          (vNotaryQueryDto: NotaryQuery, index) => {
            this.vItemDto = new Item();
            this.vItemDto.label = vNotaryQueryDto.nro.toString();
            this.vItemDto.value = vNotaryQueryDto.id;
            this.vItemDtoList.push(this.vItemDto);
          }
        );
        console.log(this.vItemDtoList);
      },
      error => {
        console.log(JSON.stringify(error.error.message));
      }
    );
  }

  loadAllRepository() {
    this.repoService.getAllRepository().subscribe(
      res => {
        this.vRepoQueryDtoList = res;
        console.log(this.vRepoQueryDtoList);
      },
      error => {
        console.log(JSON.stringify(error.error.message));
      }
    );
  }

  addRepository(pRepositoryAdd: RepoAdd) {
    this.repoService.saveRepository(pRepositoryAdd).subscribe(
      res => {
        console.log(pRepositoryAdd);
        this.cleanField();
        this.loadAllRepository();
        this.vRepoQueryDto = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  cleanField() {
    this.vRepositoryForm.reset();
  }

  validForm() {
    if (this.vRepositoryForm.valid || this.vSelectedElement) {
      return true;
    } else {
      return false;
    }
  }
}
